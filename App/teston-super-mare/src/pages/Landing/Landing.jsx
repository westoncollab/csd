import React from 'react';
import './Landing.css';
import Button from '@mui/material/button';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return <div className='landing'>
            <div className='login-buttons'>
                <Button variant='outlined' size='large' color='secondary'>
                    <Link to='/signin'>Sign up</Link>
                </Button>
                <Button variant='outlined' size='large' color='primary'>
                    <Link to='/login'>Log in</Link>
                </Button>
            </div>
            <div class='about-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae tempora ex aperiam necessitatibus amet id enim explicabo facilis blanditiis optio numquam
                 ut, voluptatibus sint officia, fuga quos facere dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Iusto, molestiae tempora ex aperiam necessitatibus amet id enim explicabo facilis blanditiis optio numquam
                 ut, voluptatibus sint officia, fuga quos facere dolore?
            </div>
        </div>
    }
}

export default Landing