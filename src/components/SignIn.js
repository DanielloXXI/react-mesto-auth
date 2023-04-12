import AuthForm from "./AuthForm";
//Войти

function SignIn(props) {
    return (
        <>
            <AuthForm title={"Вход"} buttonText={"Войти"} onAuthUser={props.onAuthUser}/>
        </>
    );
}

export default SignIn;