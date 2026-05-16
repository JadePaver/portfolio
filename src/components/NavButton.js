import { Button } from '@mui/material';

function NavButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: '#353535',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(253, 111, 0, 0.08)',
          color: '#FD6F00',
        },
      }}
    >
      {children}
    </Button>
  );
}

export default NavButton;
