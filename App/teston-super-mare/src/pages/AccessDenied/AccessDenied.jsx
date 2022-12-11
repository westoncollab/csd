import { Box, Stack, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper sx={{ p: 4 }}>
                <Stack spacing={2}>
                    <Typography variant="h4" color="error">
                        Access denied
                    </Typography>
                    <Typography variant="body2">
                        You do not have the correct credentials to view this page
                    </Typography>
                    <Button 
                        variant="outlined" 
                        onClick={() => { navigate('/') }}
                    >
                        Go home
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
}
