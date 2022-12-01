import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} /> 
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
