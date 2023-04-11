import logo from "../images/logo.svg";

function Header({ toExit, toRegistration, email, isLoggedIn, toEnter }) {
    const isRegistration = document.location.pathname === `/sign-up` ? true : false;
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__account-container">
                {isLoggedIn ? <p className="header__email">{email}</p> : ``}
                <button onClick={isLoggedIn ? toExit : isRegistration ? toEnter : toRegistration} className="header__link">{isLoggedIn ? "Выйти" : isRegistration ? "Войти" : "Регистрация"}</button>
            </div>
        </header>
    );
}

export default Header;