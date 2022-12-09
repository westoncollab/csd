import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Layout from './pages/Layout/Layout';
import Registration from './pages/Registration';
import LecturerDashboard from './pages/Lecturer/LecturerDashboard';
import UsersService from './services/users.service';
import Test from './pages/Student/Test';
import Login from './pages/Login/Login';

const users = new UsersService();

function App() { 
    const [user, setUser] = React.useState(null);// eslint-disable-line
 
    async function handleLogin(email, password) { // eslint-disable-line
        const user = await users.tryLogin(email, password);
        setUser(user);
    }
 
    function handleLogout() { // eslint-disable-line
        setUser({ isAuthenticated: false });
    }
    
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='lecturer' element={<LecturerDashboard/>} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Registration />} />
        <Route path='test' element={<Test
            testName='Programming 102'
            testId={7}
            subjects={['General Knowledge']}
            createdByLecturer='Lenny Lecturer'
            questions={[
              { qid: 1, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'},
              { qid: 2, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              { qid: 3, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'd'},
              { qid: 4, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'c'},
              { qid: 5, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              { qid: 8, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              // { qid: 7, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              // { qid: 8, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'a'},
              // { qid: 9, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'b'},
              // { qid: 10, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              // { qid: 11, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              // { qid: 12, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'}
            ]}
            userId={9}
        />} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
