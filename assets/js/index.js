// const userName=document.getElementById("user_name");
// const logoutUser= document.getElementById("logout-message");
// console.log(logoutUser)

// const activeUser= JSON.parse(sessionStorage.getItem("activeUser"));
// // console.log(activeUser)

// const showUserName=()=>{
//     userName.textContent= `${activeUser.name}`;
//     logoutUser.style.display="block";
// }

// const logout=()=>{
//     if(window.confirm("Seguro que quieres cerras sesión?"));
//     sessionStorage.removeItem("activeUser");
//     userName.textContent = "";
//     window.location.href="./index.html";
//     // logoutUser.style.display="none";
// }



// const init=()=>{
//     showUserName();
//     logoutUser.addEventListener("click", logout)
// }

// init();

const userName = document.getElementById("user_name");
const logoutUser = document.getElementById("logout-message");

if (!userName || !logoutUser) {
    console.error("Missing HTML elements.");
} else {
    const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

    const showUserName = () => {
        if (activeUser) {
            userName.textContent = `${activeUser.name}`;
            logoutUser.style.display = "block";
        }
    };

    const logout = () => {
        if (window.confirm("Seguro que quieres cerrar sesión?")) {
            sessionStorage.removeItem("activeUser");
            userName.textContent = ""; // Limpiar el nombre del usuario
            logoutUser.style.display = "none"; // Ocultar el mensaje de logout
            window.location.href = "./index.html"; // Redirigir al usuario
        }
    };

    const init = () => {
        showUserName();
        logoutUser.addEventListener("click", logout);
    };

    init();
}