/**
 * Pitch deck section IDs and labels for AI explain feature.
 * Each section has a unique ID and human-readable label so the AI knows
 * exactly where it is when generating explanations and speech.
 */

export const PITCH_SECTION_IDS = [
  'hero',
  'problem',
  'solution',
  'steps',
  'personas',
  'arch',
  'market',
  'biz',
  'roadmap',
  'risks',
  'ask',
  'team',
] as const;

export type PitchSectionId = (typeof PITCH_SECTION_IDS)[number];

/** Human-readable labels for each section – used so the AI knows which section it is presenting */
export const PITCH_SECTION_LABELS: Record<PitchSectionId, string> = {
  hero: 'The Identity Problem',
  problem: 'The Tension (Problem Statement)',
  solution: 'The Reveal (Solution Architecture)',
  steps: 'How It Works',
  personas: 'Who Benefits',
  arch: 'Architecture',
  market: 'Market Opportunity',
  biz: 'Business Model',
  roadmap: 'Roadmap',
  risks: 'Risk Analysis',
  ask: 'The Ask',
  team: 'The Team',
};

/** Type guard for PitchSectionId */
export function isPitchSectionId(value: string): value is PitchSectionId {
  return (PITCH_SECTION_IDS as readonly string[]).includes(value);
}
