    const logMailInput = document.getElementById("logMail");
    const logPassInput = document.getElementById("logPass");
    const loginForm = document.getElementById("loginForm");
    const genericAlert = document.getElementById("genericAlert");

    let registeredUsers = [];

    //* GET THE USERS IN THE LOCALSTORAGE IF NOT EMPTY
    if (localStorage.getItem("allUsers") !== null) {
        registeredUsers = JSON.parse(localStorage.getItem("allUsers"));
    }

    //* LOG IN FORM SUBMIT EVENT
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        //*INPUT VALIDATION
        inputValidation();
        clear();
    });
    function clear() {
        logMailInput.value = "";
        logPassInput.value = "";
    }
        //*INPUT VALIDATION METHOD
        function inputValidation() {
        const email = logMailInput.value;
        const password = logPassInput.value;
        let isAuthenticated = false;
        let userName = "";

        //?CHECK IF THE CREDENTIALS ARE TRUE
        for (let i = 0; i < registeredUsers.length; i++) {
            if (email === registeredUsers[i].email && password === registeredUsers[i].password) {
                isAuthenticated = true;
                userName = registeredUsers[i].name; // GET THE NAME OF THE LOGGED USER
                break;
            }
        }

        //!IF MAIL AND PASS ARE EMTY --> ALERT
if (email === "" || password === "") {
    genericAlert.classList.remove("d-none"); 
} else {
    genericAlert.classList.add("d-none");

    if (isAuthenticated) {
        localStorage.setItem("currentUser", userName); 

        window.location.href = "homePage.html";
    } else {
        genericAlert.classList.remove("d-none"); 
    }
}

    }
