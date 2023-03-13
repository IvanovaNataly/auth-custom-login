import {Button, CircularProgress} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

const userStatusEnum = {
    LOGIN: 'Log in',
    LOGOUT: 'Log out'
};

const AuthButton = () => {
    const compName = 'login-auth';
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect();
    }

    const handleLogout = async () => {
        await logout({ logoutParams: { returnTo: window.location.origin } });
    }

    const handleSubmit = () => {
        isAuthenticated ? handleLogout() : handleLogin();
    }

    return (
        <div className={compName}>
            {
                isLoading ? <CircularProgress /> : (
                    <Button
                        color={isAuthenticated ? 'error' : 'primary'}
                        variant='contained'
                        size='large'
                        onClick={handleSubmit}>
                        { isAuthenticated ? userStatusEnum.LOGOUT : userStatusEnum.LOGIN }
                    </Button>
                )
            }
        </div>
    )
}

export default AuthButton;
