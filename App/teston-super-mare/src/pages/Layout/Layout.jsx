import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

class Layout extends React.Component {
    render() {
        return <>
        <header>
            <h1>Teston-Super-Mare</h1>
        </header>
        <div className='body'>
            <Outlet className='body-content' />
        </div>
        <footer>
            <p>WS325813</p>
            <p>WS325434</p>
            <p>WS325433</p>
        </footer>
        </>
    }
}

export default Layout