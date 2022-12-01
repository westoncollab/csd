import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import TestManagement from './pages/Lecturer/TestManagement';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/test-management' element={<TestManagement/>} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
