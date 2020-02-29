"use strict"
const form = new UserForm;
form.loginFormCallback = data => {
    return ApiConnector.login(data, response => {
        if(response.success === false) {
            console.log(data);
            form.setLoginErrorMessage("Логин или пароль неверны");
        } else {
            location.reload();
        }
    });
}

form.registerFormCallback = data => {
    return ApiConnector.register(data, response => {
        if(response.success === false) {
            console.log(data);
            form.setRegisterErrorMessage("Регистрация не удалась.");
        } else {
            location.reload();
        }
    });
}

