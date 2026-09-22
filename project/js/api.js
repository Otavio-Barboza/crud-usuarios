// Manipulações com a API

// get
async function getUsers() {
    const response = await fetch(
        "http://localhost:3000/usuarios"
    );
    return await response.json();
}

async function getTasks(userId) {
    const response = await fetch(
        `http://localhost:3000/usuarios/${userId}/tarefas`
    );
    return await response.json();
}


// create
async function createUser(data) {
    await fetch("http://localhost:3000/usuarios", {
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
    const response = await fetch("http://localhost:3000/tarefas", {
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

    const task = await response.json();
    console.log(task);
}


// update
async function updateUser() {}
async function updateStatusTask() {}


// delete
async function deleteUser() {}
async function deleteTask() {}


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