import React from "react";

function AuthForm(props) {
    return (
        <div className={`auth-form`}>
            <h2 className="auth-form__title">{props.title}</h2>
            <form className={`auth-form__form`} name={`auth-form__form`}>
                <label className="auth-form__fieldset">
                    <input type="text" name="mail" className="auth-form__input popup__input_mail" id="mail" minLength="2"
                        maxLength="40" required placeholder='Email' />
                    <span className="auth-form__input-error mail-error"></span>
                </label>
                <label className="auth-form__fieldset">
                    <input type="text" name="password" className="auth-form__input auth-form__input_password"
                        id="password" minLength="2" maxLength="200" required placeholder='Пароль' />
                    <span className="auth-form__input-error password-error"></span>
                </label>
                <button type="submit" className="auth-form__submit-button">{props.buttonText}</button>
            </form>
        </div>
    );
}

export default AuthForm;