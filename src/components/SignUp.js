import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
//Регистрация

function SignUp(props) {

    return (
        <>
            <AuthForm title={"Регистрация"} buttonText={"Зарегистрироваться"} />
            <p className="auth-form__question">Уже зарегистрированы? <Link to="/sign-in" className="auth-form__link">Войти</Link></p>
        </>
    );
}

export default SignUp;