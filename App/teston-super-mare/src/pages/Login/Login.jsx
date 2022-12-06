import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return <div className="login">
<div className="container">
  <div className="screen">
    <div className="screen__content">
      <form className="login">
        <div className="login__field">
          <input
            type="text"
            className="login__input"
            placeholder="Email"
          />
        </div>
        <div className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Password"
          />
        </div>
        <Link to="/">
          <button className="button cancel">
            <span className="button_text">Cancel</span>
            <i className="button__icon fas fa-chevron-right" />
          </button>
        </Link>
        <button className="button login__submit">
          <span className="button__text">Log In</span>
          <i className="button__icon fas fa-chevron-right" />
        </button>
      </form>
    </div>
  </div>
</div>

        </div>
    }
}

export default Login
