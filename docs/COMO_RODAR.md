# Como Rodar

Guia para configurar e executar o projeto Ultima Forma em desenvolvimento local e produção.

---

## Pré-requisitos

- **Node.js** 20+ e **pnpm**
- **PostgreSQL** 16+ (com extensão [pgvector](https://github.com/pgvector/pgvector))
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
| `REDIS_HOST`   | Host do Redis          | `localhost`    |
| `REDIS_PORT`   | Porta do Redis         | `6379`         |
| `JWT_SECRET`   | Chave para tokens JWT  | *(definir)*    |
| `OPENAI_API_KEY` | Chave da OpenAI      | *(opcional)*   |

> **Segurança**: Nunca commite o arquivo `.env`. Use `.env.example` como referência.

### Postgres e Redis

O projeto depende de PostgreSQL (com pgvector) e Redis. Você pode:

**Opção A – Instalação nativa** (macOS com Homebrew):

```bash
brew install postgresql@16 redis
brew services start postgresql@16
brew services start redis
```

Para pgvector no Postgres:

```bash
# Instalar pgvector
brew install pgvector
# Reiniciar o Postgres para carregar a extensão
brew services restart postgresql@16
```

**Opção B – Docker Compose** (Postgres + Redis):

```bash
# Subir serviços
pnpm run docker:dev:up

# Ou manualmente:
docker compose -f docker-compose.dev.yml up -d

# Parar
pnpm run docker:dev:down
```

O compose usa variáveis do `.env` (DB_USERNAME, DB_PASSWORD, DB_NAME, REDIS_PASSWORD). **Com o compose, use `DB_PORT=5433` e `REDIS_PORT=6381`** no `.env` (portas diferentes para evitar conflito com serviços locais). Serviços: `localhost:5433` (Postgres) e `localhost:6381` (Redis).

### Rodar Migrações

```bash
pnpm run db:migration:run
```

**Se instalou pgvector depois de rodar as migrações:** reinicie o Postgres e execute:

```bash
brew services restart postgresql@16
pnpm run db:ensure-embeddings
```

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
| `pnpm run docker:dev:up`     | Sobe Postgres e Redis (Docker)   |
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

1. Sobe Postgres e Redis
2. Aguarda o Postgres ficar pronto
3. Executa as migrações
4. Sobe API, Web e Worker com Traefik (HTTPS via Let's Encrypt)

**Alternativa – build local (sem pull):** para testar builds localmente sem enviar ao Docker Hub:

```bash
docker compose -f docker-compose.prod.yml -f docker-compose.prod.build.yml --env-file .env.prod up -d
```

### Arquitetura de Produção

- **Traefik** – reverse proxy com TLS
- **Postgres** (pgvector) – banco de dados
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
