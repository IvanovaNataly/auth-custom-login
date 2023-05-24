/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import LoginForm from './components/login/LoginForm';
import AuthButton from './components/auth/AuthButton';

const styles = {
    app: css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    `
};


const App = () => {
    const compName = 'app';

    return (
        <div className={compName} css={styles.app}>
            <AuthButton />
        </div>
    )
};

export default App;
