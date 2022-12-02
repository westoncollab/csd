import React, { useState } from 'react';
import './Registration.css';
import { FormControl, InputLabel, Input, FormHelperText, Button, Alert, AlertTitle, Paper } from '@mui/material';
import RegistrationController from './Registration.controller';

const registrationController = new RegistrationController();
const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

    function handleSubmit(event) {
        // prevent normal form HTTP call, handle submission with JS instead
        event.preventDefault();

        // redirect new user or show error message
        registrationController.saveNewUser(firstName, lastName, email, password).then(result => {
            setAlert('success');
        }).catch (err => {
            if (err.response.data && err.response.data === 'duplicate') {
                setAlert('duplicate');
            } else {
                setAlert('error');
            }
        });
    }

    function handleInput(e, setter) {
        if (alert !== '') {
            setAlert('');
        }
        const newValue = e.target.value;
        if (newValue.length > 128) {
            setter(newValue.substring(0, 128));
        } else {
            setter(newValue);
        }
    }

    return (<>
        {alert === 'duplicate' ?
            <Alert severity='warning'>
                <AlertTitle>A record already exists with the email {email}</AlertTitle>
                Please log in instead. Contact an admin if this is a mistake or you have forgotten your password.
            </Alert>
        : alert === 'success' ?
            <Alert severity='success'>
                <AlertTitle>Success!</AlertTitle>
                    Welcome, {firstName} {lastName}!
            </Alert>
        : alert === 'error' ?
            <Alert severity='error'>
                <AlertTitle>Error!</AlertTitle>
                Please try again later.
            </Alert>
        : null}
        <Paper className='registration'>
            <form className='column' onSubmit={handleSubmit}>
                <div className='column form-inputs'>
                    <FormControl>
                        <InputLabel htmlFor='firstName'>First name</InputLabel>
                        <Input
                            id='firstName' name='firstName'
                            value={firstName}
                            onChange={(e) => handleInput(e, setFirstName)}
                            type='input'
                            required />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='lastName'>Last name</InputLabel>
                        <Input
                            id='lastName' name='lastName'
                            value={lastName}
                            onChange={(e) => handleInput(e, setLastName)}
                            type='input'
                            required />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='email'>Email address</InputLabel>
                        <Input
                            id='email' name='email'
                            value={email}
                            onChange={(e) => handleInput(e, setEmail)}
                            aria-describedby='emailHelper'
                            type='email'
                            required />
                        <FormHelperText id='emailHelper'>Please use your university email.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <Input
                            id='password' name='password'
                            value={password}
                            onChange={(e) => handleInput(e, setPassword)}
                            aria-describedby='passwordHelper'
                            type='password'
                            required />
                        <FormHelperText id='passwordHelper'>Please set a strong password.</FormHelperText>
                    </FormControl>
                </div>
                <div className='form-buttons'>
                    <Button color='error' variant='outlined' href='/'>
                        Cancel
                    </Button>
                    <Button color='success' variant='outlined' type='submit'>
                        Submit
                    </Button>
                </div>
            </form>
        </Paper>
    </>);
}

export default Registration