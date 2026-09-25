// imports de utils
import {
    selectedUser,
    validationPassword,
    resetFields,
    selectCardUser,
    updateStatusPassword,
    createCard
} from "./utils.js";

// import das functions de acesso a API.
import {
    getUsers,
    getTasks,
    createUser,
    createTask,
    updateUser,
    updateStatusTask,
    deleteUser,
    deleteTask
} from "./api.js";

// variável global
let editingUserId = null;


// inputs que não possuem eventos.
const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const inputClass = document.querySelector("#inputClass");


// evento para máscara e input do Telefone
const inputPhone = document.querySelector("#inputPhone");

inputPhone.addEventListener("blur", () => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    
    if (!regex.test(inputPhone.value)) {
        inputPhone.classList.remove("correct");
        inputPhone.classList.add("error");
    } else {
        inputPhone.classList.remove("error");
        inputPhone.classList.add("correct");
    }
});

inputPhone.addEventListener("input", (event) => {
    const mascara = /(\d{2})(\d{5})(\d{4})/;
    
    inputPhone.value = event.target.value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(mascara, "($1) $2-$3");
});


// evento para máscara e input do CPF
const inputCpf = document.querySelector("#inputCpf");

inputCpf.addEventListener("blur", (event) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    
    if (!regex.test(inputCpf.value)) {
        inputCpf.classList.remove("correct");
        inputCpf.classList.add("error");
    } else {
        inputCpf.classList.remove("error");
        inputCpf.classList.add("correct");
    }
});

inputCpf.addEventListener("input", (event) => {
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    
    inputCpf.value = event.target.value
    .replace(/|D/g, "")
    .slice(0, 11)
    .replace(mask, "$1.$2.$3-$4");
});


// Evento de validação do input da senha
const inputPassword = document.querySelector("#inputPassword");

inputPassword.addEventListener("input", () => {
    updateStatusPassword();
});


// botão de cancelar os registros novos do usuário
const buttonCancelRegister = document.querySelector("#cancelRegister");

buttonCancelRegister.addEventListener("click", () => {
    resetFields();
});


// botão de salvar os dados novos de usuário
const buttonSaveRegister = document.querySelector("#saveRegister");

buttonSaveRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    
    const isPasswordValid = Object.values(validationPassword).every(value => value.status === true);
    const messageRegister = document.querySelector("#messageRegister");
    
    if (!isPasswordValid) {
        messageRegister.textContent = "Sua senha não está no padrão exigido!";
        return
    }
    
    try {
        if (editingUserId === null) {
            await createUser({
                name : inputName.value,
                email : inputEmail.value,
                class : inputClass.value,
                phone : inputPhone.value,
                cpf : inputCpf.value,
                password : inputPassword.value
            });
            messageRegister.textContent = "Usuário criado!";
        } else {
            await updateUser(editingUserId, {
                name : inputName.value,
                email : inputEmail.value,
                class : inputClass.value,
                phone : inputPhone.value,
                cpf : inputCpf.value,
                password : inputPassword.value
            });
            messageRegister.textContent = "Usuário atualizado!";
        }

        await loadUsers();
    } catch (error) {
        if (error.status === 400) {
            messageRegister.textContent = "Dados inválidos!";
        } else if (error.status === 404) {
            messageRegister.textContent = "Item não encontrado, tente novamente!";
        } else if (error.status >= 500) {
            messageRegister.textContent = "Problema no servidor, tente mais tarde!";
        } else {
            messageRegister.textContent = "Erro inesperado!";
        }
    }
    
    resetFields();
    
    editingUserId = null;

    setTimeout(() => {
        messageRegister.textContent = "";
    }, 4000);
});


//  botão de salvar a nova tarefa
const buttonSaveTask = document.querySelector("#saveTask");

buttonSaveTask.addEventListener("click", async () => {
    const inputTitleTask = document.querySelector("#inputTitleTask");
    const inputDescriptionTask = document.querySelector("#inputDescriptionTask");
    const taskMessage = document.querySelector("#taskMessage");
    
    if (selectedUser.userId == null) {
        console.log("")
        taskMessage.textContent = "Selecione um usuário para adicionar uma tarefa!";
        return
    } 
    
    if (inputTitleTask.value.trim() === "") {
        taskMessage.textContent = "Preencha o campo de título da tarefa!";
        return
    }
    
    if (inputDescriptionTask.value.trim() === "") {
        taskMessage.textContent = "Preencha o campo de descrição da tarefa!";
        return
    }
    
    try {
        await createTask({
            title : inputTitleTask.value,
            description : inputDescriptionTask.value,
            status : false,
            userId : selectedUser.userId
        });

        taskMessage.textContent = "Tarefa criada!";
        await loadTasks();
    } catch (error) {
        if (error.status === 400) {
            taskMessage.textContent = "Dados inválidos!";
        } else if (error.status === 404) {
            taskMessage.textContent = "Item não encontrado, tente novamente!";
        } else if (error.status >= 500) {
            taskMessage.textContent = "Problema no servidor, tente mais tarde!";
        } else {
            taskMessage.textContent = "Erro inesperado!";
        }
    }

});


// carregamento dos usuários
const buttonLoadUsers = document.querySelector("#loadUsers");

buttonLoadUsers.addEventListener("click", async (event) => {
    await loadUsers();
});

async function loadUsers() {
    const gridUsers = document.querySelector("#gridUsers");
    const messageRegister = document.querySelector("#messageRegister");
    
    try {
        const data = await getUsers();
    
        gridUsers.textContent = "";

        for (const user of data) {
            // criando as bases
            const { card : cardUser, buttons : buttonsUser } = createCard("user", user);

            // criando os botões da segunda seção
            const buttonTask = document.createElement("button");
            const buttonEdit = document.createElement("button");
            const buttonRemove = document.createElement("button");

            buttonTask.textContent = "Ver Tarefas";
            buttonEdit.textContent = "Editar Usuário";
            buttonRemove.textContent = "Excluir Usuário";

            // adicionando o ID ao card para recuperá-lo ao clicar nele e alterar seu estilo
            cardUser.id = user.id;

            // Adicionando eventos de click aos cards.
            cardUser.addEventListener("click", () => {
                const taskMessage = document.querySelector("#taskMessage");
                // carregando dados temporários
                selectedUser.name = user.nome;
                selectedUser.userId = user.id;
                
                // alterando estilo
                selectCardUser(cardUser);
                taskMessage.textContent = `Usuário selecionado: ${user.nome}`;
            });
            
            // Adicionando o evento de click em ambos botões
            buttonTask.addEventListener("click", async () => {
                // carregando dados temporários
                selectedUser.name = user.nome;
                selectedUser.userId = user.id;
                selectedUser.cardId = user.id;
                
                // alterando estilo
                selectCardUser(cardUser);
                
                // carregando tarefas do usuário
                await loadTasks();
            });

            buttonEdit.addEventListener("click", async () => {
                editingUserId = user.id;

                // Preenche os campos com os dados do usuário
                inputName.value = user.nome;
                inputEmail.value = user.email;
                inputClass.value = user.curso;
                inputPhone.value = user.telefone;
                inputCpf.value = user.cpf;
                inputPassword.value = user.senha;
                
                updateStatusPassword();

                document.querySelector("#formRegister").scrollIntoView({
                    behavior : "smooth"
                });
            });

            buttonRemove.addEventListener("click", async () => {
                try {
                    await deleteUser(user.id);
                } catch (error) {
                    if (error.status === 400) {
                        messageRegister.textContent = "Dados inválidos!";
                    } else if (error.status === 404) {
                        messageRegister.textContent = "Item não encontrado, tente novamente!";
                    } else if (error.status >= 500) {
                        messageRegister.textContent = "Problema no servidor, tente mais tarde!";
                    } else {
                        messageRegister.textContent = "Erro inesperado!";
                    }
                }

                await loadUsers();
            });
            
            // adicionando os botões
            buttonsUser.appendChild(buttonTask);
            buttonsUser.appendChild(buttonEdit);
            buttonsUser.appendChild(buttonRemove);
            
            // adicionando classe de estilo
            buttonsUser.classList.add("buttonsUser");

            // adicionando o card à grid
            gridUsers.appendChild(cardUser);
        }
    } catch (error) {
        if (error.status === 400) {
            messageRegister.textContent = "Dados inválidos!";

        } else if (error.status === 404) {
            messageRegister.textContent = "Item não encontrado, tente novamente!";
        } else if (error.status >= 500) {
            messageRegister.textContent = "Problema no servidor, tente mais tarde!";
        } else {
            messageRegister.textContent = "Erro inesperado!";
        }
    }
}

async function loadTasks() {
    const gridTasks = document.querySelector("#gridTasks");
    const taskMessage = document.querySelector("#taskMessage");

    gridTasks.textContent = "";

    try {
        // const dataUserTasks = await getTasks(user.id);
        const dataUserTasks = await getTasks(selectedUser.userId);

        for (const task of dataUserTasks) {
            // criando bases
            const { card : cardTask, buttons : buttonTask } = createCard("task", task); 
            
            const buttonStatus = document.createElement("button");
            const buttonRemove = document.createElement("button");
            
            buttonStatus.textContent = task.concluida ? "Concluída" : "Pendente";
            buttonRemove.textContent = "Excluir Tarefa";
            
            // adicionando evento de troca do status da tarefa
            buttonStatus.addEventListener("click", async () => {
                try {
                    task.concluida = !task.concluida;
                    
                    await updateStatusTask(task.id, {
                        title: task.titulo,
                        description: task.descricao,
                        status: task.concluida,
                        userId: task.usuarioId
                    });
                    
                    buttonTask.classList.remove(
                        task.concluida ? "buttonsTasksPending" : "buttonsTasksCheck"
                    );
    
                    buttonTask.classList.add(
                        task.concluida ? "buttonsTasksCheck" : "buttonsTasksPending"
                    );
    
                    buttonStatus.textContent = task.concluida
                        ? "Concluída"
                        : "Pendente";
                } catch (error) {
                    if (error.status === 400) {
                        taskMessage.textContent = "Dados inválidos!";
                    } else if (error.status === 404) {
                        taskMessage.textContent = "Item não encontrado, tente novamente!";
                    } else if (error.status >= 500) {
                        taskMessage.textContent = "Problema no servidor, tente mais tarde!";
                    } else {
                        taskMessage.textContent = "Erro inesperado!";
                    }
                }
            });

            buttonRemove.addEventListener("click", async () => {
                try {
                    await deleteTask(task.id);
                } catch (error) {
                    if (error.status === 400) {
                        taskMessage.textContent = "Dados inválidos!";
                    } else if (error.status === 404) {
                        taskMessage.textContent = "Item não encontrado, tente novamente!";
                    } else if (error.status >= 500) {
                        taskMessage.textContent = "Problema no servidor, tente mais tarde!";
                    } else {
                        taskMessage.textContent = "Erro inesperado!";
                    }
                }

                await loadTasks();
            });

            // adicionando elementos ao dom
            buttonTask.appendChild(buttonStatus);
            buttonTask.appendChild(buttonRemove);
            
            // adicionando as classes de estilo
            buttonTask.classList.add(
                task.concluida ? "buttonsTasksCheck" : "buttonsTasksPending"
            );

            // adicionando card ao dom
            gridTasks.appendChild(cardTask);
        }
    } catch (error) {
        if (error.status === 400) {
            taskMessage.textContent = "Dados inválidos!";
        } else if (error.status === 404) {
            taskMessage.textContent = "Item não encontrado, tente novamente!";
        } else if (error.status >= 500) {
            taskMessage.textContent = "Problema no servidor, tente mais tarde!";
        } else {
            taskMessage.textContent = "Erro inesperado!";
        }
    }
}