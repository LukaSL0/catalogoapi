# Catálogo API

API para gerenciamento de catálogo e produtores construída em TypeScript focando em segurança básica, organização das rotas e facilidade de escalabilidade.

## Sumário
- [Stack](#stack)
- [Principais Recursos](#principais-recursos)
- [Arquitetura & Padrões](#arquitetura--padrões)
- [Segurança](#segurança)
- [Boas Práticas Adotadas](#boas-práticas-adotadas)

## Stack
- Runtime: Node.js (ESM)
- Linguagem: TypeScript (compilado para `dist/`)
- Framework: Express
- Banco de Dados: MongoDB (Mongoose)
- Segurança: Rate Limit, JWT, Bcrypt

## Principais Recursos
- Registro/Login via rotas de autenticação (`/auth`, `/login`)
- Gestão de produtores (`/produtores`)
- Consulta de catálogo (`/catalogo`)
- Rotas administrativas dedicadas (`/admin`)
- Middleware para validação inicial de requisição (`validateRequest`)
- Conexão centralizada com MongoDB

## Arquitetura & Padrões
- Separação por domínio (`routes/`, `controllers/`, `middleware/`, `db/`)
- Rotas minimalistas: Lógica delegada a controladores
- Uso de `.lean()` para queries somente leitura
- Import ESM com extensão `.js` (NodeNext)

## Segurança
- Hash de senha com `Bcrypt`
- Token JWT com expiração
- Seleção estrita de campos (`.select`)
- Evita mutação acidental via `ReadonlyArray`

## Boas Práticas Adotadas
- Tipagem forte em handlers
- Centralização da conexão ao banco
- Erros tratados e respostas consistentes
- Funções puras para utilidades (testáveis)
- Evita lógica duplicada (middlewares reutilizáveis)
- Código preparado para escalabilidade