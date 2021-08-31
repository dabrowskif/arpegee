import React, { useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';

import Input from './Input';
import Icon from './icon';
import {AUTH} from "../../constants/actionTypes";
import {useHistory} from "react-router-dom";
import {signin, signup} from "../../actions/auth";

const initialState = {name: '', email: '', password: '', id: ''};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);



     const handleSubmit = (e) => {
         e.preventDefault();
         if(isSignup) {
             dispatch(signup(formData, history));
         } else {
             dispatch(signin(formData, history));
         }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    console.log(process.env);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup( prevIsSignup => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async res => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = error => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again.")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={5}>
                <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
                <Typography variant="h4" className={classes.signTitle}>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        render={ renderProps =>
                            <Button
                                className={classes.googleSignIn}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        }
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Button className={classes.customSignIn} type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{ isSignup ? 'Already have and account? Sign In' : 'Don\'t have an account? Sign Up'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;