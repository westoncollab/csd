import './StudentLeaderboard.css';
import { Button, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { EmojiEvents, WorkspacePremium } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import TestService from '../../services/test.service';
import UsersService from '../../services/users.service';

const testService = new TestService();
const usersService = new UsersService();
const StudentLeaderboard = ({ userId }) => {
    const topNum = 5;
    const [students, setStudents] = useState([
        { place: 1, uid: 23, name: 'Stu' },
        { place: 2, uid: 12, name: 'May' },
        { place: 3, uid: 24, name: 'Bob' },
        { place: 4, uid: 27,name: 'Frd' },
        { place: 5, uid: 2,name: 'Sue' }
    ]);
    const [userStats, setUserStats] = useState({ rank: 0, average: 0, total: 0 });
    const [totalStudents, setTotalStudents] = useState(98);

    useEffect(() => {
        const getData = async () => {
            const newStudents = await testService.getStudentLeaderboard(topNum);
            const userStats = testService.getStudentResultStats(userId);
            const totalStudents = await usersService.getTotalStudents();
            return { newStudents, userStats, totalStudents };
        }
        getData().then(({ newStudents, userStats, totalStudents }) => {
            setStudents(newStudents);
            setUserStats(userStats);
            setTotalStudents(totalStudents);
        });
    }, []);

    function ordinalSuffix(num) {
        switch(num) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return (<>
        <Button variant='contained' href='/' className='back-button'>Back to dashboard</Button>
        <Paper className='leaderboard'>
            <h2>Top {topNum} Students</h2>
            <List>
                <>{students.map((str, i) =>
                    <ListItem key={i} className={str.uid === userId ? 'highlighted-student' : ''}>
                        <ListItemIcon>
                            {str.place === 1 ? <EmojiEvents sx={{ color: '#f2cb30' }} />
                            : str.place === 2 ? <EmojiEvents sx={{ color: '#83888e' }} />
                            : str.place === 3 ? <EmojiEvents sx={{ color: '#cd7f32' }} />
                            : <WorkspacePremium sx={{ color: 'lightgrey' }} />}
                        </ListItemIcon>
                        <ListItemText>{str.name}</ListItemText>
                    </ListItem>
                )}</>
            </List>
            <p>
                You are {userStats.rank}{ordinalSuffix(userStats.rank)} of {totalStudents} with
                an average of {userStats.average}% from {userStats.total} tests
                {userStats.rank < topNum ? ', congratulations!' : '.'}
            </p>
        </Paper>
    </>);
}

export default StudentLeaderboard;