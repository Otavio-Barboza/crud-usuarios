# Tutorial -- Como executar a API local

## 1. Extrair o projeto

Extraia o arquivo da API para uma pasta no computador.

A estrutura do projeto será semelhante a:

``` text
api-local-front-end/
├── server.js
├── dados.json
├── package.json
```

------------------------------------------------------------------------

## 2. Abrir o projeto no VS Code

Abra o **Visual Studio Code** e selecione a pasta da API.

Em seguida, abra um terminal pelo menu:

``` text
Terminal > Novo Terminal
```

Certifique-se de que o terminal está aberto dentro da pasta do projeto.

------------------------------------------------------------------------

## 3. Verificar se o Node.js está instalado

No terminal, execute:

``` bash
node --version
```

Se aparecer uma versão, por exemplo:

``` text
v22.0.0
```

o Node.js está instalado corretamente.

Também é possível verificar o `npm`:

``` bash
npm --version
```

Se o comando `node` não for reconhecido, será necessário instalar o
Node.js antes de continuar.

------------------------------------------------------------------------

## 4. Instalar as dependências

Na primeira vez que executar o projeto, utilize:

``` bash
npm install
```

Esse comando instala as bibliotecas necessárias para executar a API.

Após a instalação, será criada a pasta:

``` text
node_modules/
```

> **Importante:** o `npm install` precisa ser executado apenas na
> primeira vez ou caso a pasta `node_modules` seja removida.

Para realizar a instalação das dependências é necessário acesso à
internet. Depois que elas estiverem instaladas, a API poderá ser
executada localmente sem internet.

------------------------------------------------------------------------

## 5. Iniciar a API

Execute:

``` bash
npm start
```

Se tudo estiver correto, aparecerá no terminal:

``` text
API rodando em http://localhost:3000
```

A API estará disponível no endereço:

``` text
http://localhost:3000
```

> Enquanto estiver utilizando o Front-end, mantenha o terminal da API
> aberto.

------------------------------------------------------------------------

## 6. Testar a API

Abra o navegador e acesse:

``` text
http://localhost:3000/usuarios
```

A API deverá retornar os usuários cadastrados em formato JSON.

Exemplo:

``` json
[
  {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@email.com",
    "curso": "Tecnologia em Sistemas para Internet",
    "telefone": "(43) 99999-1111",
    "cpf": "111.111.111-11",
    "senha": "Ana@123"
  }
]
```

Outros endereços que podem ser testados:

### Listar todas as tarefas

``` text
http://localhost:3000/tarefas
```

### Buscar um usuário pelo ID

``` text
http://localhost:3000/usuarios/1
```

### Buscar as tarefas de um usuário

``` text
http://localhost:3000/usuarios/1/tarefas
```

------------------------------------------------------------------------

## 7. Executar o Front-end

Com a API em execução, o Front-end poderá realizar requisições para:

``` text
http://localhost:3000
```

No JavaScript:

``` javascript
const API = "http://localhost:3000";
```

Exemplo de uma requisição para buscar os usuários:

``` javascript
async function carregarUsuarios() {
    const resposta = await fetch(`${API}/usuarios`);
    const usuarios = await resposta.json();

    console.log(usuarios);
}

carregarUsuarios();
```

------------------------------------------------------------------------

## 8. Parar a API

Para encerrar a API, volte ao terminal onde ela está sendo executada e
pressione:

``` text
Ctrl + C
```

------------------------------------------------------------------------

## 9. Executar novamente

Depois que as dependências já estiverem instaladas, não é necessário
executar `npm install` novamente.

Basta abrir a pasta do projeto no VS Code e executar:

``` bash
npm start
```

------------------------------------------------------------------------

## Problemas comuns

### `node` não é reconhecido

Se aparecer uma mensagem semelhante a:

``` text
'node' não é reconhecido como um comando
```

o Node.js provavelmente não está instalado ou não está configurado
corretamente no computador.

### `Cannot find module 'express'`

Se aparecer:

``` text
Cannot find module 'express'
```

as dependências provavelmente ainda não foram instaladas.

Execute:

``` bash
npm install
```

e depois:

``` bash
npm start
```

### Porta 3000 já está sendo utilizada

Se aparecer uma mensagem indicando que a porta `3000` já está em uso,
provavelmente existe outra execução da API aberta.

Localize o terminal onde a API já está executando e pressione:

``` text
Ctrl + C
```

Depois, execute novamente:

``` bash
npm start
```

------------------------------------------------------------------------

## Resumo

### Primeira execução

``` bash
npm install
npm start
```

### Próximas execuções

``` bash
npm start
```

### Endereço da API

``` text
http://localhost:3000
```

### Encerrar a API

``` text
Ctrl + C
```
