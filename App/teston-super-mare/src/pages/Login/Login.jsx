import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function Login({ onLoginClick }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState();
    
    const navigate = useNavigate();

    function updatePassword(event) {
        const password = event.target.value;
        setPassword(password);
    }

    function updateEmail(event) {
        const email = event.target.value;
        setEmail(email);
    }

    async function handleLoginClick() {
        if (!email.length || !password.length) {
            setError('Please enter your email and password.');
            return;
        } 

        const user = await onLoginClick(email, password);
        if (!user.isAuthenticated) {
            setError('Invalid username or password.');
            return;
        }  

        switch (user.roleName) {
            case 'Lecturer': {
                navigate('/lecturer');
                break;
            }
            case 'Student': {
                navigate('/student');
                break;
            }
            case 'Admin': {
                navigate('/admin');
                break;
            }
            default: {
                throw new Error('Unknown user role');
            }
        }
    }

    return (<div className="login">
        <div className="container">
        <div className="screen">
            <div className="screen__content">
            <form className="login">
                <div className="login__field">
                <input
                    required
                    type="text"
                    className="login__input"
                    placeholder="Email"
                    onChange={event => updateEmail(event)}
                />
                </div>
                <div className="login__field">
                <input
                    required
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    onChange={event => updatePassword(event)}
                />
                </div>
                <Link to="/">
                <button className="button cancel" type="button">
                    <span className="button_text">Cancel</span>
                    <i className="button__icon fas fa-chevron-right" />
                </button>
                </Link>
                <button 
                    type="button"
                    className="button login__submit"
                    onClick={async() => handleLoginClick()}
                >
                <span className="button__text">Log In</span>
                <i className="button__icon fas fa-chevron-right" />
                </button>
            </form>
            {error && (
                <Typography color="white">
                    {error}
                </Typography>
            )}
            </div>
        </div>
        </div>
    </div>)
}

export default Login
