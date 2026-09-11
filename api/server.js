const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORTA = 3000;
const ARQUIVO = path.join(__dirname, "dados.json");

app.use(cors());
app.use(express.json());

function lerDados() {
  return JSON.parse(fs.readFileSync(ARQUIVO, "utf-8"));
}

function salvarDados(dados) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
}

// USUÁRIOS
app.get("/usuarios", (req, res) => {
  res.json(lerDados().usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const dados = lerDados();
  const usuario = dados.usuarios.find(u => u.id === Number(req.params.id));
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });
  res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  const dados = lerDados();
  const { nome, email, curso, telefone, cpf, senha } = req.body;

  if (!nome || !email || !curso || !telefone || !cpf || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  const id = dados.usuarios.length ? Math.max(...dados.usuarios.map(u => u.id)) + 1 : 1;
  const usuario = { id, nome, email, curso, telefone, cpf, senha };

  dados.usuarios.push(usuario);
  salvarDados(dados);
  res.status(201).json(usuario);
});

app.put("/usuarios/:id", (req, res) => {
  const dados = lerDados();
  const usuario = dados.usuarios.find(u => u.id === Number(req.params.id));

  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

  const { nome, email, curso, telefone, cpf, senha } = req.body;
  if (!nome || !email || !curso || !telefone || !cpf || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  Object.assign(usuario, { nome, email, curso, telefone, cpf, senha });
  salvarDados(dados);
  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const dados = lerDados();
  const id = Number(req.params.id);
  const indice = dados.usuarios.findIndex(u => u.id === id);

  if (indice === -1) return res.status(404).json({ mensagem: "Usuário não encontrado" });

  dados.usuarios.splice(indice, 1);
  dados.tarefas = dados.tarefas.filter(t => t.usuarioId !== id);
  salvarDados(dados);
  res.status(204).send();
});

// TAREFAS
app.get("/tarefas", (req, res) => {
  res.json(lerDados().tarefas);
});

app.get("/tarefas/:id", (req, res) => {
  const dados = lerDados();
  const tarefa = dados.tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  res.json(tarefa);
});

app.get("/usuarios/:id/tarefas", (req, res) => {
  const dados = lerDados();
  const usuarioId = Number(req.params.id);

  if (!dados.usuarios.some(u => u.id === usuarioId)) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json(dados.tarefas.filter(t => t.usuarioId === usuarioId));
});

app.post("/tarefas", (req, res) => {
  const dados = lerDados();
  const { titulo, descricao, concluida = false, usuarioId } = req.body;
  const uid = Number(usuarioId);

  if (!titulo || !descricao || !usuarioId) {
    return res.status(400).json({ mensagem: "Título, descrição e usuarioId são obrigatórios" });
  }

  if (!dados.usuarios.some(u => u.id === uid)) {
    return res.status(400).json({ mensagem: "Usuário informado não existe" });
  }

  const id = dados.tarefas.length ? Math.max(...dados.tarefas.map(t => t.id)) + 1 : 1;
  const tarefa = { id, titulo, descricao, concluida: Boolean(concluida), usuarioId: uid };

  dados.tarefas.push(tarefa);
  salvarDados(dados);
  res.status(201).json(tarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const dados = lerDados();
  const tarefa = dados.tarefas.find(t => t.id === Number(req.params.id));

  if (!tarefa) return res.status(404).json({ mensagem: "Tarefa não encontrada" });

  const { titulo, descricao, concluida, usuarioId } = req.body;
  const uid = Number(usuarioId);

  if (!titulo || !descricao || typeof concluida !== "boolean" || !usuarioId) {
    return res.status(400).json({ mensagem: "Título, descrição, concluida e usuarioId são obrigatórios" });
  }

  if (!dados.usuarios.some(u => u.id === uid)) {
    return res.status(400).json({ mensagem: "Usuário informado não existe" });
  }

  Object.assign(tarefa, { titulo, descricao, concluida, usuarioId: uid });
  salvarDados(dados);
  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const dados = lerDados();
  const indice = dados.tarefas.findIndex(t => t.id === Number(req.params.id));

  if (indice === -1) return res.status(404).json({ mensagem: "Tarefa não encontrada" });

  dados.tarefas.splice(indice, 1);
  salvarDados(dados);
  res.status(204).send();
});

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
