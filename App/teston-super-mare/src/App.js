import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Layout from './pages/Layout/Layout';
import Test from "./pages/Test/Test";

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='test' element={<Test
            testName='Programming 102'
            testId={-1}
            subjects={['General Knowledge', 'Numeracy', 'Astrology']}
            createdByLecturer='Heri'
            questions={[
              { quid: 1, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'},
              { quid: 2, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              { quid: 3, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'a'},
              { quid: 4, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'b'},
              { quid: 5, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              { quid: 6, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              { quid: 7, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              { quid: 8, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'a'},
              { quid: 9, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'b'},
              { quid: 10, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              { quid: 11, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              { quid: 12, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'}
            ]}
        />} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
