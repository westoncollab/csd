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
              { qid: 1, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'},
              { qid: 2, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              { qid: 3, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'a'},
              { qid: 4, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'b'},
              { qid: 5, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              { qid: 6, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              { qid: 7, question: 'How are you today?', a: 'True', b: 'False', answer: 'a'},
              { qid: 8, question: 'Where is the Moon?', a: 'Up', b: 'Down', c: 'Left', d: 'Right', answer: 'a'},
              { qid: 9, question: 'Who is the Prime Minister?', a: 'Them', b: 'You', c: 'Me', answer: 'b'},
              { qid: 10, question: 'What question is this?', a: '6', b: '13', c: '5', answer: 'c'},
              { qid: 11, question: 'What question was that?', a: '6', b: '13', c: '5', answer: 'c'},
              { qid: 12, question: 'Which is the best flavour?', a: 'Orange', b: 'Rose', c: 'Marmite', answer: 'b'}
            ]}
        />} />
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
