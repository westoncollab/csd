import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

class Layout extends React.Component {
    render() {
        return <>
        <header>
            <h1>Teston-Super-Mare</h1>
        </header>
            <Outlet />
            <p>Footer</p>
        </>
    }
}

export default Layout