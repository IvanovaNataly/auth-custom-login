import './app.css';
import LoginForm from './components/login/LoginForm';

const App = () => {
    const compName = 'app';

    return (
        <div className={compName}>
            <LoginForm />
        </div>
    )
};

export default App;
