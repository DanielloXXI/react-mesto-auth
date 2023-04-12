import React from 'react';


function AuthForm(props) {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAuthUser({
            email: formValue.email,
            password: formValue.password,
            setFormValue: setFormValue
        });
        // здесь обработчик регистрации
    }

    return (
        <div className={`auth-form`}>
            <h2 className="auth-form__title">{props.title}</h2>
            <form className={`auth-form__form`} name={`auth-form__form`} onSubmit={handleSubmit}>
                <label className="auth-form__fieldset">
                    <input type="email" name="email" className="auth-form__input popup__input_mail" id="mail" minLength="2"
                        maxLength="40" required placeholder='Email' value={formValue.username} onChange={handleChange} />
                    <span className="auth-form__input-error mail-error"></span>
                </label>
                <label className="auth-form__fieldset">
                    <input type="password" name="password" className="auth-form__input auth-form__input_password"
                        id="password" minLength="2" maxLength="200" required placeholder='Пароль' value={formValue.username} onChange={handleChange} />
                    <span className="auth-form__input-error password-error"></span>
                </label>
                <button type="submit" className="auth-form__submit-button">{props.buttonText}</button>
            </form>
        </div>
    );
}

export default AuthForm;