document.addEventListener("DOMContentLoaded", function () {
    //*ELEMENTS
    const signNameInput = document.getElementById("signName");
    const signMailInput = document.getElementById("signMail");
    const signPassInput = document.getElementById("signPass");
    const signupForm = document.getElementById("signupForm");
    const alertInvalidName = document.getElementById("nameAlert");
    const alertInvalidemail = document.getElementById("emailAlert");
    const alertInvalidPassword = document.getElementById("passwordAlert");
    const alertCreatedAccount = document.getElementById("accountCreatedAlert");
    const alertUserPresent = document.getElementById("userPresent");

    //*ARRAY TO STORE USERS FROM THE LOCALSTORAGE
    let allUsers = [];

    //? CHECK IF THERE ARE USERS IN THE LOCALSTORAGE
    if (localStorage.getItem("allUsers") !== null) {
        allUsers = JSON.parse(localStorage.getItem("allUsers"));
    }

    //* SIGN UP FORM SUBMIT EVENT
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        //VALIDATION
        inputValidation();
        clear();
    });
    //* SIGN UP FORM SUBMIT EVENT

    function clear() {
        signNameInput.value = "";
        signMailInput.value = "";
        signPassInput.value = "";
    }

    function inputValidation() {
        //*REGEX
        const nameRegex = /^[a-zA-Z]{4,50}$/;  // min length: 4, max length: 50
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        //*REGEX

        //?Validation
        const isNameValid = nameRegex.test(signNameInput.value);
        const isEmailValid = emailRegex.test(signMailInput.value);
        const isPassValid = passwordRegex.test(signPassInput.value);

        allValid(isNameValid, isEmailValid, isPassValid);
    }

    function allValid(nameTest, emailTest, passTest) {
        //?Conditions
        if (nameTest && emailTest && passTest) {
            AddUser(signNameInput.value, signMailInput.value, signPassInput.value);
        }
        else {
            if (!nameTest) {
                alertInvalidName.classList.remove('d-none');
            }
            if (!emailTest) {
                alertInvalidemail.classList.remove('d-none');
            }
            if (!passTest) {
                alertInvalidPassword.classList.remove('d-none');
            }
        }
    }

    function AddUser(name, email, password) {
        if (isPresent(email)) {
            alertUserPresent.classList.remove("d-none");
            alertCreatedAccount.classList.add('d-none');
        } else {
            let user = {
                name: name,
                email: email,
                password: password
            };
            allUsers.push(user);
            localStorage.setItem("allUsers", JSON.stringify(allUsers));


            //*ALLERT AFTER ADDING USER
            alertUserPresent.classList.add("d-none");
            alertCreatedAccount.classList.remove('d-none');
        }
    }

    function isPresent(email) {
        return allUsers.some(user => user.email === email);
    }
});