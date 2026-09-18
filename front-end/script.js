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
inputPhone.addEventListener("blur", (event) => {
    console.log(event.target.value);
});

// evento para máscara do CPF
inputCpf.addEventListener("blur", (event) => {
    console.log(event.target.value);
});

inputPassword.addEventListener("input", (event) => {
    console.log(event.target.value);
});


// buttons

const buttonCancelRegister = document.querySelector("#cancelRegister");

// eventos
buttonCancelRegister.addEventListener("click", () => {
    inputName.value = "";
    inputEmail.value = "";
    inputClass.value = "";
    inputPhone.value = "";
    inputCpf.value = "";
    inputPassword.value = "";
});