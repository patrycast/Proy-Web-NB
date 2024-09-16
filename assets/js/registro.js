const registerForm=document.getElementById("registro-form");
const nameInput= document.getElementById("nombre");
const emailInput= document.getElementById("correo");
const passInput= document.getElementById("contrasena");


const users= JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage=()=>{
    localStorage.setItem('users', JSON.stringify(users))
}

//------------constantes
const MIN_CARACTERS=3;
const MAX_CARACTERES=25;

// ------------------funciones auxiliares

const isEmpty= (input)=>{
    console.log(!input.value.trim().length)
    return !input.value.trim().length;
}

const isBetween= (input, min, max)=>{
    return input.value.length >= min && input.value.length <=max;
}

// funcion para validar email con regex
const isEmailValid=(input)=>{
    const regex= /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    //test
    return regex.test(input.value.trim())
}

const isExistingEmail=(input)=>{
    return users.some(user => user.email === input.value.trim());
}

// funcion para validar la contraseña
const isPasswordSecure=(input)=> {
    const regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return regex.test(input.value.trim());
}

// ------------------funciones de Error/Exito

const showError= (input, message)=>{
    console.log(input, message)
    const formField=input.parentElement;
    // console.log("error: ",formField);
    formField.classList.remove("success");
    formField.classList.add("error");
    const error= formField.querySelector("small");
    error.style.display="block";
    error.textContent=message;
}

const showSuccess= (input)=>{
    const formField=  input.parentElement;
    console.log(formField);
    formField.classList.remove("error");
    formField.classList.add("success");

    const error= formField.querySelector("small");
    error.textContent=" ";
}

// ------------------funciones de validaciones



const checkTextInput= (input)=>{
    console.log(input);
    let valid=false;

    // validaciones
    if(isEmpty(input)){
        console.log("Esta vacio");
        showError(input, "Campo Obligatorio");
        return;

    }
    if(!isBetween(input, MIN_CARACTERS, MAX_CARACTERES)){
        console.log("El campo debe tener entre 3 y 25 caracteres")
        showError(input, `El campo debe contener entre ${MIN_CARACTERS} y ${MAX_CARACTERES} caracteres`);
        return;
    }

    console.log("Input validado");
    showSuccess(input);
    valid=true;
    return valid;

}

// funcion para validar el email
const checkEmail=(input)=>{
    let valid=false;

    if(isEmpty(input)){
        showError(input, "Campo Obligatorio");
        return;
    }

    if(!isEmailValid(input)){
        showError(input, "El mail no es valido");
        return;
    }
    
    if(isExistingEmail(input)){
        showError(input, "El Email ya se encuentra registrado")
        return;
    }

    console.log("Input validado");
    showSuccess(input);
    valid=true;
    return valid;
}

// funcion para validar password
const checkPassword=(input)=>{
    let valid=false;
    
    if(isEmpty(input)){
        showError(input, "Campo Obligatorio");
        return;
    }

    if(!isPasswordSecure(input)){
        showError(input, "La contraseña debe contener entre 8 y 16 caracteres, una  mayuscula, una minuscula y un simbolo");
        return
    }

    console.log("Input validado");
    showSuccess(input);
    valid=true;
    return valid;

}

//validacion

const validateForm=(e)=>{
    e.preventDefault();
    let isNameValid= checkTextInput(nameInput);
    let isEmailValid= checkEmail(emailInput);
    let isPasswordValid= checkPassword(passInput);


    let isValidForm= isNameValid &&isEmailValid && isPasswordValid;

    if(isValidForm){
        console.log("El registro fue exitoso")
        users.push({
            name: nameInput.value,
            email: emailInput.value,
            password: passInput.value,
        })
        saveToLocalStorage();
        alert("Te registraste con exito");
        window.location.href="login.html";
    }

}



const init= ()=>{
    registerForm.addEventListener('submit', validateForm );
    nameInput.addEventListener("input",()=> checkTextInput(nameInput));
    emailInput.addEventListener("input", ()=> checkEmail(emailInput));
    passInput.addEventListener("input", ()=> checkPassword(passInput));
   

    
};

init();