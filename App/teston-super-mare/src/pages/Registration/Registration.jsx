import React, { useState } from 'react';
import './Registration.css';
import { FormControl, InputLabel, Input, FormHelperText, Button, Paper } from '@mui/material';
import RegistrationController from './Registration.controller';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registrationController = new RegistrationController();

    function handleSubmit(event) {
        // prevent normal form HTTP call, handle submission with JS instead
        event.preventDefault();

        // redirect new user or show error message
        registrationController.saveNewUser(firstName, lastName, email, password).then(result => {
            console.log('success! redirect to login/dashboard');
            console.log(result);
        }).catch (err => {
            console.log('caught response:');
            console.log(err.response);
        });
    }

    return (<Paper className='registration'>
        <form className='column' onSubmit={handleSubmit}>
            <div className='column form-inputs'>
                <FormControl>
                    <InputLabel htmlFor='firstName'>First name</InputLabel>
                    <Input
                        id='firstName' name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type='input'
                        required />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='lastName'>Last name</InputLabel>
                    <Input
                        id='lastName' name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type='input'
                        required />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='email'>Email address</InputLabel>
                    <Input
                        id='email' name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
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
    </Paper>);
}

export default Registration