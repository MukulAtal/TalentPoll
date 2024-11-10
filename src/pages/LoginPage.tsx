import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
    return (
        <div className="talent-poll-bg flex-1 center justify-center">
            <div className="login-page-content">Welcome to Talent Poll</div>
            <LoginForm /> 
        </div>
    );
}

export default LoginPage;