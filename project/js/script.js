// imports de utils
import {
    selectedUser,
    validationPassword,
    resetFields,
    selectCardUser
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

    for (let index = 0; index < validationPassword.length; index++) {

        if (validationPassword[index].regex.test(inputPassword.value)) {
            validationPassword[index].icon.classList.remove("bi-x-circle-fill");
            validationPassword[index].icon.classList.add("bi-check-circle-fill");
            validationPassword[index].status = true;
        } else {
            validationPassword[index].icon.classList.remove("bi-check-circle-fill");
            validationPassword[index].icon.classList.add("bi-x-circle-fill");
            validationPassword[index].status = false;
        }
    }
});


// botão de cancelar os registros novos do usuário
const buttonCancelRegister = document.querySelector("#cancelRegister");

buttonCancelRegister.addEventListener("click", () => {
    resetFields();
});


// botão de salvar os dados novos de usuário
const buttonSaveRegister = document.querySelector("#saveRegister");

buttonSaveRegister.addEventListener("click", async (event) => {
    // event.preventDefault();
    
    const isPasswordValid = Object.values(validationPassword).every(value => value === true);
    const messageRegister = document.querySelector("#messageRegister");
    
    if (isPasswordValid) {
        messageRegister.textContent = "Usuário Cadastrado com Sucesso!";
        await createUser({
            name : inputName.value,
            email : inputEmail.value,
            class : inputClass.value,
            phone : inputPhone.value,
            cpf : inputCpf.value,
            password : inputPassword.value
        });
        resetFields();
    } else {
        messageRegister.textContent = "Algum dado inserido está incorreto.";
    }
    
    setTimeout(() => {
        messageRegister.textContent = "";
    }, 4000);
});


//  botão de salvar a nova tarefa
const buttonSaveTask = document.querySelector("#saveTask");

buttonSaveTask.addEventListener("click", async () => {
    const inputTitleTask = document.querySelector("#inputTitleTask");
    const inputDescriptionTask = document.querySelector("#inputDescriptionTask");
    
    if (selectedUser.userId == null) {
        console.log("Selecione um usuário para adicionar uma tarefa!")
        return
    } 
    
    if (inputTitleTask.value.trim() === "") {
        console.log("Preencha o campo de título da tarefa!")
        return
    }
    
    if (inputDescriptionTask.value.trim() === "") {
        console.log("Preencha o campo de descrição da tarefa!")
        return
    }
    
    createTask({
        title : inputTitleTask.value,
        description : inputDescriptionTask.value,
        status : false,
        userId : selectedUser.userId
    });
});


// carregamento dos usuários
const buttonLoadUsers = document.querySelector("#loadUsers");

buttonLoadUsers.addEventListener("click", async (event) => {
    const gridUsers = document.querySelector("#gridUsers");
    const data = await getUsers();

    gridUsers.textContent = "";

    for (const user of data) {
        // criando as bases
        const cardUser = document.createElement("div");
        const informationUser = document.createElement("div");
        const buttonsUser = document.createElement("div");

        // criando a primeira seção da base de cards
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        
        // criando a segunda seção da base de cards
        const buttonTask = document.createElement("button");
        const buttonEdit = document.createElement("button");
        const buttonRemove = document.createElement("button");

        // adicioando conteúdo aos elementos do primeiro conteúdo
        h3.textContent = user.nome;
        p.textContent = user.email;
        
        // criando os botões da segunda seção
        buttonTask.textContent = "Ver Tarefas";
        buttonEdit.textContent = "Editar Usuário";
        buttonRemove.textContent = "Excluir Usuário";

        // adicionando o ID ao card para recuperá-lo ao clicar nele e alterar seu estilo
        cardUser.id = user.id;

        // Adicionando eventos de click aos cards.
        cardUser.addEventListener("click", () => {
            // carregando dados temporários
            selectedUser.name = user.nome;
            selectedUser.userId = user.id;
            
            // alterando estilo
            console.log(`clicando no card ${cardUser.id}`);
            selectCardUser(cardUser);
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
            const dataUserTasks = await getTasks(user.id);
            await loadTasks(dataUserTasks);
        });

        buttonEdit.addEventListener("click", () => {
            console.log("Editando Usuário");
        });
        
        // adicionando as seções principais
        cardUser.appendChild(informationUser);
        cardUser.appendChild(buttonsUser);
        cardUser.appendChild(buttonsUser);

        
        // adicionando os conteúdos das sessões
        informationUser.appendChild(h3);
        informationUser.appendChild(p);
        buttonsUser.appendChild(buttonTask);
        buttonsUser.appendChild(buttonEdit);
        buttonsUser.appendChild(buttonRemove);


        // adicionando as classes de estilo
        cardUser.classList.add("card");
        informationUser.classList.add("information");
        buttonsUser.classList.add("buttons");
        buttonsUser.classList.add("buttonsUser");

        // adicionando o card à grid
        gridUsers.appendChild(cardUser);
    }
});

async function loadTasks(tasks) {
    const gridTasks = document.querySelector("#gridTasks");

    gridTasks.textContent = "";

    for (const task of tasks) {
        // criando bases
        const cardTask = document.createElement("div");
        const informationTask = document.createElement("div");
        const buttonTask = document.createElement("div");
        
        // criando elementos da primeira sessão
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const buttonStatus = document.createElement("button");
        const buttonRemove = document.createElement("button");

        // Adicionando conteúdo aos elementos
        h3.textContent = task.titulo;
        p.textContent = task.descricao;
        buttonStatus.textContent = task.concluida ? "Concluída" : "Pendente";
        buttonRemove.textContent = "Excluir Tarefa";

        // adicionando evento de troca do status da tarefa
        buttonStatus.addEventListener("click", async () => {});

        // adicionando elementos ao dom
        cardTask.appendChild(informationTask);
        cardTask.appendChild(buttonTask);
        informationTask.appendChild(h3);
        informationTask.appendChild(p);
        buttonTask.appendChild(buttonStatus);
        buttonTask.appendChild(buttonRemove);
        
        // adicionando as classes de estilo
        cardTask.classList.add("card");
        informationTask.classList.add("information");
        
        buttonTask.classList.add("buttons");
        buttonTask.classList.add(
            task.concluida ? "buttonsTasksCheck" : "buttonsTasksPending"
        );

        // adicionando card ao dom
        gridTasks.appendChild(cardTask);
    }
}