import React from "react";
import SingUserForm from "./SingUserForm";

function Login(props) {

    return (
        <SingUserForm
            name={'signIn'}
            btnType='Войти'
            title='Вход'
            onSubmit={props.onSubmit}
        >
        </SingUserForm>
    )
}

export default Login;