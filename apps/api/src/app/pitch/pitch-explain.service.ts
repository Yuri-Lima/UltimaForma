import { Injectable, Logger } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import {
  isPitchSectionId,
  mapI18nToMlLang,
  PITCH_SECTION_CONTEXT,
  PITCH_SECTION_LABELS,
  type PitchSectionId,
} from '@ultima-forma/shared';
import type { ChatMessage } from '@ultima-forma/shared';

const EXPLAIN_MAX_OUTPUT_CHARS = 2000;

/** Truncates at word boundary to avoid cutting mid-word. */
function truncateAtWordBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.substring(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > maxLength * 0.5 ? cut.substring(0, lastSpace) : cut).trim();
}

@Injectable()
export class PitchExplainService {
  private readonly logger = new Logger(PitchExplainService.name);

  constructor(private readonly llmService: LlmService) {}

  async explainSection(
    sectionId: PitchSectionId,
    lang?: string
  ): Promise<string> {
    if (!isPitchSectionId(sectionId)) {
      throw new Error(`Invalid section ID: ${sectionId}`);
    }

    const langCode = mapI18nToMlLang(lang ?? 'en');
    const langInstruction =
      langCode === 'en'
        ? 'Respond in English.'
        : `Respond in the language with code "${langCode}" (e.g. Portuguese for "pt", Spanish for "es").`;

    const sectionLabel = PITCH_SECTION_LABELS[sectionId] ?? sectionId;
    const sectionContext = PITCH_SECTION_CONTEXT[sectionId] ?? '';

    const systemPrompt = `You are the founder of Ultima Forma, presenting a pitch to an angel investor.

LOCATION: You are presenting section "${sectionId}" — "${sectionLabel}". Generate text and speech ONLY for this section. Do not mix in content from other sections.

You speak naturally and persuasively, as if in a live pitch meeting. Use "we" and a confident, direct tone.
Base everything on the section content below. ${langInstruction}
Keep the response under ${EXPLAIN_MAX_OUTPUT_CHARS} characters. Always end with a complete sentence—never cut off mid-word.`;

    const userPrompt = `Present the section "${sectionLabel}" (${sectionId}) of our pitch deck to an angel investor.

Section content (your script — use only this):
---
${sectionContext}
---

Deliver this section as you would in a pitch: highlight the key message, why it matters for an angel, and what makes it compelling. Stay strictly within this section. End with a complete, polished closing sentence.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: userPrompt },
    ];

    const result = await this.llmService.chatCompletion(messages, {
      maxTokens: 600,
      temperature: 0.5,
    });

    let explanation = result.content.trim();
    if (explanation.length > EXPLAIN_MAX_OUTPUT_CHARS) {
      explanation = truncateAtWordBoundary(explanation, EXPLAIN_MAX_OUTPUT_CHARS);
    }
    this.logger.debug(`Pitch explain completed for section=${sectionId}`);
    return explanation;
  }

  async askFollowUp(
    sectionId: PitchSectionId,
    userMessage: string,
    conversationHistory?: { role: 'user' | 'assistant'; content: string }[],
    lang?: string
  ): Promise<string> {
    if (!isPitchSectionId(sectionId)) {
      throw new Error(`Invalid section ID: ${sectionId}`);
    }

    const langCode = mapI18nToMlLang(lang ?? 'en');
    const langInstruction =
      langCode === 'en'
        ? 'Respond in English.'
        : `Respond in the language with code "${langCode}" (e.g. Portuguese for "pt", Spanish for "es").`;

    const sectionLabel = PITCH_SECTION_LABELS[sectionId] ?? sectionId;
    const sectionContext = PITCH_SECTION_CONTEXT[sectionId] ?? '';

    const systemPrompt = `You are the founder of Ultima Forma, in a pitch meeting with an angel investor.

LOCATION: You are in section "${sectionId}" — "${sectionLabel}". Answer questions ONLY about this section. Do not bring in content from other sections unless the investor explicitly asks.

Answer as the founder would: confident, direct, and persuasive.
Use this section content as your reference:
---
${sectionContext}
---
Reference only the content above when answering. ${langInstruction}
Keep each response under ${EXPLAIN_MAX_OUTPUT_CHARS} characters. Always end with a complete sentence.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory?.map((m) => ({
        role: m.role,
        content: m.content,
      })) ?? []),
      { role: 'user', content: userMessage },
    ];

    const result = await this.llmService.chatCompletion(messages, {
      maxTokens: 600,
      temperature: 0.5,
    });

    let explanation = result.content.trim();
    if (explanation.length > EXPLAIN_MAX_OUTPUT_CHARS) {
      explanation = truncateAtWordBoundary(explanation, EXPLAIN_MAX_OUTPUT_CHARS);
    }
    this.logger.debug(`Pitch follow-up completed for section=${sectionId}`);
    return explanation;
  }
}
