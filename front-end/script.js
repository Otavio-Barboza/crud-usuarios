let newUser = {
    name : null,
    email : null,
    class : null,
    phone : null,
    cpf : null,
    password : null
}

const inputName = document.querySelector("#inputName");

inputName.addEventListener("change", (event) => {
    newUser.name = event.target.value;
    console.log(newUser);
});


const inputEmail = document.querySelector("#inputEmail");

inputEmail.addEventListener("change", (event) => {
    newUser.email = event.target.value;
    console.log(newUser);
});


const inputClass = document.querySelector("#inputClass");

inputClass.addEventListener("input", (event) => {
    console.log(event.target.value);
});


const inputPhone = document.querySelector("#inputPhone");

inputPhone.addEventListener("input", (event) => {
    console.log(event.target.value);
});


const inputCpf = document.querySelector("#inputCpf");

inputCpf.addEventListener("input", (event) => {
    console.log(event.target.value);
});


const inputPassword = document.querySelector("#inputPassword");

inputPassword.addEventListener("input", (event) => {
    console.log(event.target.value);
});