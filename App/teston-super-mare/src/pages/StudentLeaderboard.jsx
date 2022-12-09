import { Button, List, ListItem, ListItemIcon, ListItemText, Paper, Stack } from '@mui/material';
import { EmojiEvents, WorkspacePremium } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import TestService from '../services/test.service';

const testService = new TestService();
const StudentLeaderboard = ({ userId }) => {
    const topNum = 5;
    const [students, setStudents] = useState([{ place: 0, uid: 0, name: '' }]);
    const [userStats, setUserStats] = useState({ rank: 0, average: 0, total: 0 });
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        testService.getStudentLeaderboard(topNum, userId).then(({ studentLeaderboard, userStats, totalStudents }) => {
            setStudents(studentLeaderboard);
            setUserStats(userStats);
            setTotalStudents(totalStudents);
        });
    }, []);

    function ordinalSuffix(num) {
        const digitArr = String(num).split('');
        const lastDigit = digitArr[digitArr.length - 1];
        switch(lastDigit) {
            case '1': return 'st';
            case '2': return 'nd';
            case '3': return 'rd';
            default: return 'th';
        }
    }

    function jointPlace() {
        const countStudentsWithRank = students.filter(stu => stu.place === userStats.rank).length;
        return countStudentsWithRank > 1 ? 'joint ' : '';
    }

    return (<>
        <Button variant='contained' href='/' style={{ position: 'absolute', top: '100px', left: '15vw' }}>
            Back to dashboard
        </Button>
        <Paper style={{ width: '30vw', minWidth: '280px' }}>
            <Stack alignItems='center'>
                <h2>Top {Math.min(topNum, totalStudents)} Students</h2>
                <List>
                    <>{students.map((str, i) =>
                        <ListItem key={i} sx={str.uid === userId ? { border: 1, borderColor: 'lightgrey', borderRadius: 1} : {}}>
                            <ListItemIcon>
                                {str.place === 1 ? <EmojiEvents sx={{ color: '#f2cb30' }} />
                                : str.place === 2 ? <EmojiEvents sx={{ color: '#83888e' }} />
                                : str.place === 3 ? <EmojiEvents sx={{ color: '#cd7f32' }} />
                                : <WorkspacePremium sx={{ color: 'lightgrey' }} />}
                                {str.place}
                            </ListItemIcon>
                            <ListItemText>{str.name}</ListItemText>
                        </ListItem>
                    )}</>
                </List>
                <p style={{ textAlign: 'center' }}>
                    You are {jointPlace()}{userStats.rank}{ordinalSuffix(userStats.rank)} of {totalStudents} students
                    {userStats.rank <= topNum ? ', congratulations!' : '.'}
                    <br/><br/>
                    You have an average of {Math.round(userStats.average * 100)}%
                    from {userStats.total} test{userStats.total === 1 ? '' : 's'}.
                </p>
            </Stack>
        </Paper>
    </>);
}

export default StudentLeaderboard;