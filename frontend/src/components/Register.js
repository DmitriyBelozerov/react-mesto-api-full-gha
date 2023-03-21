import React from "react";
import SingUserForm from "./SingUserForm";
import {Link} from 'react-router-dom';

function Register(props) {

    return (
        <SingUserForm
            name={'signUp'}
            btnType={'Зарегистрироваться'}
            title='Регистрация'
            onSubmit={props.onSubmit}
        >
            <p className="form__question">Уже зарегистрированы? <Link className="form__question-sign-in" to='/sign-in'> Войти</Link></p>
        </SingUserForm>
    )
}

export default Register;