import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import LecturerDashboard from './pages/LecturerDashboard/LecturerDashboard';
import LecturerTestManagement from './pages/LecturerDashboard/TestManagement';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/lecturer' element={<LecturerDashboard/>} />
        <Route path='/lecturer/test-management' element={<LecturerTestManagement/>} />
        <Route path='/lecturer/student-management' element={<StudentManagement/>} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
