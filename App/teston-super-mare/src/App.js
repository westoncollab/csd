import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Layout from './pages/Layout/Layout';
import Registration from './pages/Registration';
import Test from './pages/Student/Test';
import LecturerDashboard from './pages/Lecturer/LecturerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersService from './services/users.service';
import StudentDashboard from './pages/Student/dashboard';
import Login from './pages/Login/Login';
import AccessDenied from './pages/AccessDenied/AccessDenied';

const users = new UsersService();

function App() { 
    const [user, setUser] = React.useState(null);// eslint-disable-line
 
    async function handleLogin(email, password) { // eslint-disable-line
        const user = await users.tryLogin(email, password);
        setUser(user);
        
        return user;
    }
  
    function ProtectedRoute({ requiredRole, children }) {
        return !user || user.roleName !== requiredRole ? <AccessDenied/> : children;
    }

  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route 
            path='lecturer' 
            element={
                <ProtectedRoute requiredRole="Lecturer">
                    <LecturerDashboard user={user} />
                </ProtectedRoute>
            } 
        />  
        <Route
            path="admin"
            element={
                <ProtectedRoute requiredRole="Admin">
                    <AdminDashboard user={user} />
                </ProtectedRoute>
            }
        />
        <Route 
            path="student"
            element={
                <ProtectedRoute requiredRole="Student">
                    <StudentDashboard user={user}/>
                </ProtectedRoute>
            }
        />
        
        <Route path="login" element={<Login onLoginClick={handleLogin} />} /> 
        <Route path='signup' element={<Registration />} />

        <Route path='test/:testId' element={<ProtectedRoute requiredRole="Student">
            <Test user={user} />
        </ProtectedRoute>} /> 
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
