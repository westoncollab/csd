import React from 'react';
import './Registration.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (<form className='white-bg registration column' onSubmit={this.handleSubmit}>
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
                <FormHelperText id='emailHelper'>Please use your uni email.</FormHelperText>
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
        </form>);
    }
}

export default Registration