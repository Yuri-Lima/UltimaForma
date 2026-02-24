# Como Rodar

Guia para configurar e executar o projeto Ultima Forma em desenvolvimento local e produção.

---

## Pré-requisitos

- **Node.js** 20+ e **pnpm**
- **PostgreSQL** 18 (principal) + **pgvector** (apenas para embeddings, em instância separada)
- **Redis** 7+

---

## 1. Desenvolvimento Local

### Instalação

```bash
# Clonar e instalar dependências
git clone <repo-url>
cd Ultima-Forma
pnpm install
```

### Variáveis de Ambiente

Copie `.env.example` para `.env` na raiz do projeto e ajuste os valores:

```bash
cp .env.example .env
```

Variáveis essenciais para desenvolvimento:

| Variável       | Descrição              | Padrão (local) |
|----------------|------------------------|----------------|
| `DB_HOST`      | Host do PostgreSQL     | `localhost`    |
| `DB_PORT`      | Porta do PostgreSQL    | `5432`         |
| `DB_USERNAME`  | Usuário do banco       | `postgres`     |
| `DB_PASSWORD`  | Senha do banco         | *(vazio)*      |
| `DB_NAME`      | Nome do banco          | `ultimaforma`  |
| `VECTOR_DB_HOST` | Host do vector DB (embeddings) | `localhost` |
| `VECTOR_DB_PORT` | Porta do vector DB     | `5432` ou `5434` (Docker) |
| `REDIS_HOST`   | Host do Redis          | `localhost`    |
| `REDIS_PORT`   | Porta do Redis         | `6379`         |
| `JWT_SECRET`   | Chave para tokens JWT  | *(definir)*    |
| `OPENAI_API_KEY` | Chave da OpenAI      | *(opcional)*   |

> **Segurança**: Nunca commite o arquivo `.env`. Use `.env.example` como referência.

### Postgres, Vector DB e Redis

O projeto usa dois bancos PostgreSQL:
- **Primary (postgres:18)**: usuários, refresh_tokens e dados normais
- **Vector DB (pgvector)**: apenas embeddings

**Opção A – Instalação nativa** (macOS com Homebrew):

```bash
brew install postgresql@18 redis
brew services start postgresql@18
brew services start redis
```

Para usar embeddings localmente, você precisa de uma instância separada com pgvector:

```bash
brew install pgvector
brew services restart postgresql@18
# Ou use Docker para o vector-db (Opção B)
```

**Opção B – Docker Compose** (Postgres + Vector DB + Redis, recomendado):

```bash
# Subir serviços
pnpm run docker:dev:up

# Ou manualmente:
docker compose -f docker-compose.dev.yml up -d

# Parar
pnpm run docker:dev:down
```

O compose sobe: Postgres 18 (primary), vector-db (pgvector), Redis. **No `.env` use `DB_PORT=5433`, `VECTOR_DB_HOST=localhost`, `VECTOR_DB_PORT=5434` e `REDIS_PORT=6381`** para evitar conflito com serviços locais. Serviços: `localhost:5433` (Postgres), `localhost:5434` (Vector DB), `localhost:6381` (Redis).

### Rodar Migrações

```bash
pnpm run db:migration:run
```

**Com Docker:** após `docker:dev:up`, execute `pnpm run db:ensure-embeddings` (conecta ao vector-db). Com Postgres nativo + pgvector, use `VECTOR_DB_*` apontando para a instância com pgvector.

### Iniciar os Serviços

Use 3 terminais:

```bash
# Terminal 1 – API (porta 3100)
pnpm run start:api

# Terminal 2 – Frontend (porta 4300)
pnpm run start:web

# Terminal 3 – Worker (opcional, processamento em background)
pnpm run start:worker
```

**URLs locais:**

- **Web**: http://localhost:4300  
- **API**: http://localhost:3100  
- **API GraphQL**: http://localhost:3100/graphql  

O frontend usa proxy para `/api` → `http://localhost:3100`.

---

## 2. Comandos Úteis

| Comando                       | Descrição                        |
|------------------------------|----------------------------------|
| `deploy/build-and-push.sh [versão]` | Build e push de imagens prod para Docker Hub |
| `pnpm run docker:dev:up`     | Sobe Postgres, vector-db e Redis (Docker) |
| `pnpm run docker:dev:down`   | Para Postgres e Redis            |
| `pnpm run start:api`         | Inicia a API NestJS              |
| `pnpm run start:web`         | Inicia o frontend Angular        |
| `pnpm run start:worker`      | Inicia o worker BullMQ           |
| `pnpm run build:api`         | Build da API                     |
| `pnpm run build:web`         | Build do frontend                |
| `pnpm nx build shared`       | Build da lib compartilhada       |
| `pnpm run db:migration:run`  | Executa migrações                |
| `pnpm run db:migration:show` | Lista migrações aplicadas        |
| `pnpm run db:migration:revert` | Reverte última migração        |
| `pnpm run db:ensure-embeddings` | Cria tabela embeddings no vector DB |

---

## 3. Deploy em Produção

### Preparação

1. Copie `deploy/.env.prod.example` para `deploy/.env.prod`
2. Preencha todas as variáveis (incluindo `JWT_SECRET`, `DB_PASSWORD`, etc.)

### Build e push de imagens para Docker Hub

As imagens de produção (api, web, worker) são construídas localmente e enviadas ao Docker Hub antes do deploy. No servidor, o compose apenas faz pull dessas imagens.

**Fluxo:**

1. Faça login: `docker login`
2. Execute o script de build e push:

```bash
cd deploy
./build-and-push.sh 1.0.0
```

O script determina a versão por: argumento CLI → git tag → `package.json`. Exemplos:

- `./build-and-push.sh 1.0.0` — usa a versão informada
- `./build-and-push.sh` — usa git tag (ex: `v1.0.0`) ou versão do `package.json`

As imagens são publicadas como `yurimatoslima/ultimaforma-{api,web,worker}:<versão>` e `:latest`.

**Fixar versão em produção:** defina `IMAGE_TAG=1.0.0` em `deploy/.env.prod` para garantir deploys reproduzíveis. Se omitir, será usada a tag `latest`.

### Deploy com Docker

```bash
cd deploy
./deploy.sh
```

O script:

1. Sobe Postgres, vector-db e Redis
2. Aguarda os bancos ficarem prontos
3. Executa migrações (primary) e `db:ensure-embeddings` (vector DB)
4. Sobe API, Web e Worker com Traefik (HTTPS via Let's Encrypt)

**Alternativa – build local (sem pull):** para testar builds localmente sem enviar ao Docker Hub:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.build.yml --env-file .env.prod up -d
```

### Arquitetura de Produção

- **Traefik** – reverse proxy com TLS
- **Postgres** (18) – banco principal (usuários, tokens)
- **Vector DB** (pgvector) – apenas embeddings
- **Redis** – filas BullMQ
- **API** – NestJS (GraphQL + REST)
- **Web** – Angular (build estático via nginx)
- **Worker** – processamento assíncrono

---

## 4. Solução de Problemas

### Erro de conexão com Postgres

- Verifique se o Postgres está rodando: `pg_isready -h localhost -p 5432`
- Confira `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` e `DB_NAME` no `.env`

### Erro de conexão com Redis

- Verifique: `redis-cli ping` deve retornar `PONG`
- Confira `REDIS_HOST` e `REDIS_PORT`

### Erro "relation does not exist"

Execute as migrações: `pnpm run db:migration:run`

### Frontend não conecta na API

- API deve estar em `http://localhost:3100`
- O proxy em `apps/web/proxy.conf.json` mapeia `/api` → API

---

## Mais Informações

- [Plano de implementação](IMPLEMENTATION_PLAN.md) – visão técnica e checklists
- [README principal](../README.md) – visão do produto e estrutura do projeto
