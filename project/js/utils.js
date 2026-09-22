// Utils
let selectedUser = {
    name : null,
    userId : null
}

let validationPassword = [
    {
        icon : document.querySelector("#iconMinCaractere"),
        regex : /.{8,}/,
        status : false
    },
    {
        icon : document.querySelector("#iconMax"),
        regex : /[A-Z]/,
        status : false
    },
    {
        icon : document.querySelector("#iconMin"),
        regex : /[a-z]/,
        status : false
    },
    {
        icon : document.querySelector("#iconNumber"),
        regex : /\d/,
        status : false
    },
    {
        icon : document.querySelector("#iconSpecialCaractere"),
        regex : /[!@#$%^&*(),.?":{}|<>_]/,
        status : false
    },
]

function resetFields() {
    inputName.value = "";
    inputEmail.value = "";
    inputClass.value = "";
    inputPhone.value = "";
    inputCpf.value = "";
    inputPassword.value = "";
}

function selectCardUser(card) {
    // function para alterar o estilo do card selecionado.
    const cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("selectedCard");
    }
    card.classList.add("selectedCard");
}

export {
    selectedUser,
    validationPassword,
    resetFields,
    selectCardUser
};