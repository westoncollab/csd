import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

function LinkButton({ children, href, color, onClick }) {
  return (
    <Button
      color={color}
      variant="outlined"
      onClick={onClick}
      href={href}
      fullWidth
    >
      {children}
    </Button>
  )
}

export default function Lecturer() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper>
        <Stack
          spacing={2}
          sx={{
            width: 500,
            p: 4
          }}
        >
          <Typography variant="h4">
            Lecturer Dashboard
          </Typography>
          <Typography>
            Hello 👋
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-evenly'
            }}
          >
            <LinkButton
              color="primary"
              href="lecturer/student-management"
            >
              Student Management
            </LinkButton>
            <LinkButton
              color="secondary"
              href="lecturer/test-management"
            >
              Test Management
            </LinkButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
