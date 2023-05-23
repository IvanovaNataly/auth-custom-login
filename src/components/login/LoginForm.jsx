/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Button, Box, Typography, Avatar } from '@mui/material';
import { loginStyles } from './loginStyles.js';
import auth0 from 'auth0-js';
import { validator } from './validator.js';
import useForm from './useForm.js';

export const loginFields = {
    EMAIL: 'email',
    PASSWORD: 'password'
};

const LoginForm = () => {
    const compName = 'login';
    const config = JSON.parse(decodeURIComponent(window.config));

    const params = Object.assign({
        overrides: {
            __tenant: config.auth0Tenant,
            __token_issuer: config.authorizationServer.issuer
        },
        domain: config.auth0Domain,
        clientID: config.clientID,
        redirectUri: config.callbackURL,
        responseType: 'code'
    }, config.internalOptions);

    const webAuth = new auth0.WebAuth(params);

    const initState = {
        [loginFields.EMAIL]: '',
        [loginFields.PASSWORD]: ''
    };

    const submit = () => {
        console.log('Submited', state);
        requestLogin();
    };

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        handleError,
        state,
        errors
    } = useForm({
        initState,
        callback: submit,
        validator
    });

    const isValidForm =
        Object.values(errors).filter(error => typeof error !== 'undefined')
            .length === 0;

    const requestLogin = () => {
        webAuth.login(
            {
                realm: 'Username-Password-Authentication',
                username: state[loginFields.EMAIL],
                password: state[loginFields.PASSWORD]
            },
            function(err) {
                if (err) handleError(err);
            }
        );
    }

    return (
        <Box
            component='form'
            className={compName}
            sx={loginStyles.container}
            onSubmit={handleSubmit}
        >
            <Avatar
                alt="Avatar"
                src="/images/confused_dog.gif"
                sx={loginStyles.avatar}
            />

            <Typography variant='h1' align='center' color='primary' fontWeight='600' sx={{fontSize: 24, marginBottom: 3}}>
                Custom Login Page
            </Typography>

            <Typography variant="body1" sx={loginStyles.paragraph}>You are landed on a Custom Login Page hosted at Auth0 domain.</Typography>
            <Typography variant="body1" sx={loginStyles.paragraph}>The page is a SPA uploaded with a single js file.</Typography>
            <Typography variant="body1" sx={loginStyles.paragraph}>Custom email and password validation are supported.</Typography>

            <Typography variant="body1" sx={loginStyles.paragraph}>
                At the same time, authentication and authorization are fully provided by Auth0.
            </Typography>
            <Typography variant="body1" sx={loginStyles.paragraph}>An explanation of the concept is described in
                <a
                    target="_blank"
                    rel="noreferrer"
                    href='https://habr.com/ru/articles/722734/'
                    css={loginStyles.link}>
                    my article
                </a>.
            </Typography>

            {Object.keys(initState).map(field => (
                <TextField type='text'
                           label={loginFields[field.toLocaleUpperCase()]}
                           name={field}
                           defaultValue={state[field]}
                           onChange={handleChange}
                           error={errors[field] !== undefined}
                           helperText={errors[field]}
                           onBlur={handleBlur}
                           fullWidth
                           required
                           variant='outlined'
                           key={field}
                           className={`${compName}-textField`}
                           sx={loginStyles.textField}/>
            )) }

            <Button type='submit'
                    color='primary'
                    variant='contained'
                    autoFocus
                    size='large'
                    disabled={!isValidForm}
                    fullWidth>
                Log in
            </Button>
        </Box>
    )
}

export default LoginForm;
