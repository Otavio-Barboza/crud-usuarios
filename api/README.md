# API Local - Usuários e Tarefas

API preparada para atividades de Front-end com Fetch.

## Requisitos
- Node.js instalado.

## Primeira execução
```bash
npm install
npm start
```

Depois do `npm install`, a API pode ser utilizada sem internet.

## Endereço
http://localhost:3000

## Endpoints

### Usuários
- GET /usuarios
- GET /usuarios/:id
- POST /usuarios
- PUT /usuarios/:id
- DELETE /usuarios/:id
- GET /usuarios/:id/tarefas

### Tarefas
- GET /tarefas
- GET /tarefas/:id
- POST /tarefas
- PUT /tarefas/:id
- DELETE /tarefas/:id

Os dados ficam armazenados no arquivo `dados.json`.
