import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Stack, FormControl, InputLabel, Input
} from '@mui/material';

export default function CreateLecturerDialog({ usersService, open, onClose, onCancel, onLecturerCreated }) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const { insertId } = await usersService.addLecturer(firstName, lastName, email, password);
        onLecturerCreated({ userId: insertId, firstName, lastName, email, password });
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add a new lecturer</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <FormControl>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="input"
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="input"
                                    required
                                />
                            </FormControl>
                        </Stack>
                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onCancel}
                        variant="outlined"
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="success"
                    >
                        Submit
                    </Button>
                </DialogActions>

            </form>
        </Dialog>
    )
}
