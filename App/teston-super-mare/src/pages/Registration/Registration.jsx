import React from 'react';
import './Registration.css';
import { FormControl, InputLabel, Input, FormHelperText, Button, Paper } from '@mui/material';
import RegistrationController from './Registration.controller';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.registrationController = new RegistrationController();
        this.state = {
            firstName: 'Test',
            lastName: 'Student',
            email: 'test@tsm.ac.uk',
            password: 'pass'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // prevent normal form HTTP call, handle submission with JS instead
        event.preventDefault();
        
        // redirect new user or show error message
        this.registrationController.saveNewUser(this.state).then(result => {
            console.log('success! redirect to login/dashboard');
            console.log(result);
        }).catch (err => {
            console.log('caught response:');
            console.log(err.response);
        });
    }

    render() {
        return (<Paper className='registration'>
            <form className='column' onSubmit={this.handleSubmit}>
                <div className='column form-inputs'>
                    <FormControl>
                    <InputLabel htmlFor='firstName'>First name</InputLabel>
                    <Input
                        id='firstName' name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        type='input'
                        required />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='lastName'>Last name</InputLabel>
                    <Input
                        id='lastName' name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        type='input'
                        required />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='email'>Email address</InputLabel>
                    <Input
                        id='email' name='email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        aria-describedby='emailHelper'
                        type='email'
                        required />
                    <FormHelperText id='emailHelper'>Please use your university email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                        id='password' name='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
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
}

export default Registration