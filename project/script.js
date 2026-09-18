// Utils
function resetFields() {
    inputName.value = "";
    inputEmail.value = "";
    inputClass.value = "";
    inputPhone.value = "";
    inputCpf.value = "";
    inputPassword.value = "";
}


// novos usuários - formulário
const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const inputClass = document.querySelector("#inputClass");
const inputPhone = document.querySelector("#inputPhone");
const inputCpf = document.querySelector("#inputCpf");
const inputPassword = document.querySelector("#inputPassword");

// eventos
inputName.addEventListener("input", (event) => {
    console.log(newUser);
});

inputEmail.addEventListener("input", (event) => {
    console.log(newUser);
});

inputClass.addEventListener("input", (event) => {
    console.log(event.target.value);
});

// evento para máscara do Telefone
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

// evento para máscara do CPF
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


let validationPassword = {
    lowercase : false,
    uppercase : false,
    specialCaractere : false,
    minCaractere : false,
    number : false
}

inputPassword.addEventListener("input", () => {

    // icons
    const iconMinCaractere = document.querySelector("#iconMinCaractere");
    const regexMinCaractere = /.{8,}/;
    
    if (regexMinCaractere.test(inputPassword.value)) {
        iconMinCaractere.classList.remove("bi-x-circle-fill");
        iconMinCaractere.classList.add("bi-check-circle-fill");
        
        validationPassword.minCaractere = true;
    } else {
        iconMinCaractere.classList.remove("bi-check-circle-fill");
        iconMinCaractere.classList.add("bi-x-circle-fill");
        
        validationPassword.minCaractere = false;
    }
    

    const iconMax = document.querySelector("#iconMax");
    const regexMax = /[A-Z]/;
    
    if (regexMax.test(inputPassword.value)) {
        iconMax.classList.remove("bi-x-circle-fill");
        iconMax.classList.add("bi-check-circle-fill");
        
        validationPassword.uppercase = true;
    } else {
        iconMax.classList.remove("bi-check-circle-fill");
        iconMax.classList.add("bi-x-circle-fill");
        
        validationPassword.uppercase = false;
    }
    

    const iconMin = document.querySelector("#iconMin");
    const regexMin = /[a-z]/;
    
    if (regexMin.test(inputPassword.value)) {
        iconMin.classList.remove("bi-x-circle-fill");
        iconMin.classList.add("bi-check-circle-fill");
        
        validationPassword.lowercase = true;
    } else {
        iconMin.classList.remove("bi-check-circle-fill");
        iconMin.classList.add("bi-x-circle-fill");
        
        validationPassword.lowercase = false;
    }
    

    const iconNumber = document.querySelector("#iconNumber");
    const regexNumber = /\d/;
    
    if (regexNumber.test(inputPassword.value)) {
        iconNumber.classList.remove("bi-x-circle-fill");
        iconNumber.classList.add("bi-check-circle-fill");
        
        validationPassword.number = true;
    } else {
        iconNumber.classList.remove("bi-check-circle-fill");
        iconNumber.classList.add("bi-x-circle-fill");
        
        validationPassword.number = false;
    }
    

    const iconSpecialCaractere = document.querySelector("#iconSpecialCaractere");
    const regexSpecialCaractere = /[!@#$%^&*(),.?":{}|<>_]/;
    
    if (regexSpecialCaractere.test(inputPassword.value)) {
        iconSpecialCaractere.classList.remove("bi-x-circle-fill");
        iconSpecialCaractere.classList.add("bi-check-circle-fill");
        
        validationPassword.specialCaractere = true;
    } else {
        iconSpecialCaractere.classList.remove("bi-check-circle-fill");
        iconSpecialCaractere.classList.add("bi-x-circle-fill");
        
        validationPassword.specialCaractere = false;
    }
});


// buttons
const buttonCancelRegister = document.querySelector("#cancelRegister");
const buttonSaveRegister = document.querySelector("#saveRegister");
const buttonloadUsers = document.querySelector("#loadUsers");

// eventos
buttonCancelRegister.addEventListener("click", () => {
    resetFields();
});

buttonSaveRegister.addEventListener("click", (event) => {
    event.preventDefault();
    
    const isPasswordValid = Object.values(validationPassword).every(value => value === true);
    const messageRegister = document.querySelector("#messageRegister");

    if (isPasswordValid) {
        messageRegister.textContent = "Usuário Cadastrado com Sucesso!";
        resetFields();
    } else {
        messageRegister.textContent = "Algum dado inserido está incorreto.";
    }

    setTimeout(() => {
        messageRegister.textContent = "";
    }, 4000);
});

buttonloadUsers.addEventListener("click", async (event) => {
    const gridUsers = document.querySelector("#gridUsers");
    const data = awaitgetUsers();

    for (const user of data) {
        const cardUser = null;
    }
});

// Manipulações com a API

// get
async function getUsers() {
    const response = await fetch(
        "http://localhost:3000/usuarios"
    );
    const users = await response.json();

    console.log(users);
}

async function getTasks() {}


// create
async function createUser() {}
async function createTask() {}


// update
async function updateUsers() {}
async function updateStatusTask() {}


// delete
async function deleteUser() {}
async function deleteTask() {}