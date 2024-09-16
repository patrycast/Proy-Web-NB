const loginForm= document.getElementById("login__form");
const emailInput= document.getElementById("email");
const passInput= document.getElementById("password");
const errorMessage= document.getElementById("form__error");
console.log(loginForm);

const users= JSON.parse(localStorage.getItem("users")) || []; console.log(users)

const isEmpty=(input)=>{
    return !input.value.trim().length;
}
const isExistingEmail=(input)=>{
    return users.some((user)=> user.email === input.value.trim());
}
const isMatchingPass=(input)=>{
    const user= users.find((user) => user.email === emailInput.value.trim());
    console.log(user)
    return user.password === input.value.trim();
}

const showError=(message)=>{
    errorMessage.textContent=message;
}


const isValidAccount= ()=>{
    let valid =false;

    if(isEmpty(emailInput)){
        showError("Por favor llene los campos");
        return;
    }
    if(!isExistingEmail(emailInput)){
        showError("El Email no existe");
        return;
    }

    if(isEmpty(passInput)){
        showError("Por favor llene los campos");
        return;
    }

    if(!isMatchingPass(passInput)){
        showError("Los datos ingresados no son correctos.");
        return;
    }

    valid=true;
    errorMessage.textContent="";
    return valid;
}


const login= (e)=>{
    e.preventDefault();

    if(isValidAccount()){
        console.log("cuenta valida");
        const user= users.find(user => user.email=== emailInput.value.trim());
        sessionStorage.setItem("activeUser", JSON.stringify(user));
        window.location.href="../index.html";
    }
    console.log("no valido")
}



const init= ()=>{
    loginForm.addEventListener("submit", login);
}

init();