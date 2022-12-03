import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import Registration from './pages/Registration/Registration';
import UsersService from './services/users.service';

const users = new UsersService();

function App() {
    const [user, setUser] = React.useState(null);

    async function handleLogin(email, password) {
        const user = users.login(email, password);
        setUser(user);
    }
    
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='signup' element={<Registration />} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
