import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Stack, FormControl, FormHelperText, InputLabel, Input
} from '@mui/material';

export default function CreateLecturerDialog({ subjectsService, isDuplicate, open, onClose, onCancel, onSubjectCreated }) {
    const [subjectName, setSubjectName] = React.useState('');
    const [error, setError] = React.useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (subjectName.length === 0) {
            setError('Subject name length must be greated than 0');
            return;
        }
        
        if (isDuplicate(subjectName)) {
            setError('There is already a subject with that name');
            return;
        }

        const { insertId } = await subjectsService.addSubject({ subjectName });
        onSubjectCreated({ subjectId: insertId, subjectName });
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add a new subject</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <FormControl>
                            <InputLabel htmlFor="subject">Subject</InputLabel>
                            <Input
                                id="subject"
                                name="subject"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)} 
                                error={Boolean(error)}
                                required
                            />
                            {Boolean(error) && (
                                <FormHelperText>{error}</FormHelperText>    
                            )}
                            
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