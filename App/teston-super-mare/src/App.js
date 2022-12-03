import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import TestManagement from './pages/Lecturer/TestManagement';
import Registration from './pages/Registration/Registration';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/test-management' element={<TestManagement/>} />
        <Route path='/signup' element={<Registration />} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
