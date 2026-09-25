import { request } from "./utils.js";

// Manipulações com a API

// get
async function getUsers() {
    return await request("http://localhost:3000/usuarios");
}

async function getTasks(id) {
    return request(
        `http://localhost:3000/usuarios/${id}/tarefas`
    );
}


// create
async function createUser(data) {
    return await request("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome : data.name,
            email : data.email,
            curso : data.class,
            telefone : data.phone,
            cpf : data.cpf,
            senha : data.password
        })
    });
}

async function createTask(data) {
    return await request("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo : data.title,
            descricao : data.description,
            concluida : data.status,
            usuarioId : data.userId
        })
    });
}


// update
async function updateUser(id, data) {
    return await request(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: data.name,
            email: data.email,
            curso: data.class,
            telefone: data.phone,
            cpf: data.cpf,
            senha: data.password
        })
    });
}

async function updateStatusTask(id, data) {
    return await request(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: data.title,
            descricao: data.description,
            concluida: data.status,
            usuarioId: data.userId
        })
    });
}


// delete
async function deleteUser(id) {
    return await request(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE"
    });
}

async function deleteTask(id) {
    return await request(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    });
}


export {
    getUsers,
    getTasks,
    createUser,
    createTask,
    updateUser,
    updateStatusTask,
    deleteUser,
    deleteTask
};