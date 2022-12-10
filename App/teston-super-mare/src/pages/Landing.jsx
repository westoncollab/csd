import React from 'react';
import { Stack, Button, Paper } from '@mui/material';

const Landing = () => {
    return (
        <Stack
            sx={{ height: 1 }}
            alignItems='center'
            justifyContent='center'
            spacing={12}
        >
            <Paper sx={{ p: 2.5 }}>
                <Stack
                    direction='row'
                    justifyContent={'space-evenly'}
                    sx={{ minWidth: 275 }}
                >
                    <Button variant='outlined' size='large' color='secondary' href='/signup'>
                        Sign up
                    </Button>
                    <Button variant='outlined' size='large' color='primary' href='/login'>
                        Log in
                    </Button>
                </Stack>
            </Paper>
            <Paper sx={{ p: 5 }}>
                <p>Situated in the sunny seaside town of Weston-super-Mare, we're proud to be the top higher education centre in North Somerset.</p>
                <p>We provide over 45 degree level programmes and short courses that will enable you to reach the next level or help you kickstart your career. From employer-based higher apprenticeships to full-time degrees and Higher Technical Qualifications (HTQs), all of our programmes are in partnership with UWE Bristol, Bath Spa University and Hartpury College.</p>
                <p>Our diverse range of courses attract learners from all walks of life. We're smaller in size, but bigger in opportunity. Our smaller classes mean learners get more attention and interaction from our industry connected lecturing staff as well as the incredible student support on offer from our HEART team.</p>
            </Paper>
        </Stack>
    );
}

export default Landing