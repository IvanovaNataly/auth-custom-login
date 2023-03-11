import { TextField, Button, Box, Typography } from '@mui/material';
import './loginForm.css';
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
            onSubmit={handleSubmit}
        >
            <Typography variant='h1' align='center' color='primary' fontWeight='600' sx={{fontSize: 24, marginBottom: 3}}>
                Welcome
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
                           className={`${compName}-textField`}/>
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
