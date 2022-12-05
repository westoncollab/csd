import './StudentLeaderboard.css';
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useState } from 'react';

const StudentLeaderboard = ({ userId }) => {
    const topNum = 5;
    const [students, setStudents] = useState([
        { place: 1, uid: 23, name: 'Stu' },
        { place: 2, uid: 12, name: 'May' },
        { place: 3, uid: 24, name: 'Bob' },
        { place: 4, uid: 27,name: 'Frd' },
        { place: 5, uid: 2,name: 'Sue' }
    ]);
    const userRank = 45;
    const totalStudents = 98;

    return (<>
        <Button variant='contained' href='/' className='back-button'>Back to dashboard</Button>
        <Paper className='leaderboard'>
            <h2>Top {topNum} Students</h2>
            <List>
                {students.map((studentRanking, i) => (
                    <ListItem key={i} className={studentRanking.uid === userId ? 'highlighted-student' : ''}>
                        <ListItemText>{studentRanking.place}: {studentRanking.name}</ListItemText>
                    </ListItem>
                ))}
            </List>
            {!students.some(stu => stu.uid === userId)
                ? <p>You are {userRank}th of {totalStudents}</p>
                : null
            }
        </Paper>
    </>);
}

export default StudentLeaderboard;