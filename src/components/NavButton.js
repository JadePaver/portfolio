import { Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

function NavButton({ children, onClick, isActive, onMouseEnter, onMouseLeave, onFocus, textColor }) {
  const isWhite = textColor === 'white';
  const activeColor = isWhite ? '#ffffff' : '#FD6F00';
  const defaultColor = isWhite ? 'rgba(255,255,255,0.82)' : '#353535';
  const hoverColor = isWhite ? '#ffffff' : '#FD6F00';
  const pillBg = isWhite ? 'rgba(255,255,255,0.2)' : 'rgba(253,111,0,0.1)';

  return (
    <Button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      sx={{
        position: 'relative',
        color: isActive ? activeColor : defaultColor,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        textTransform: 'none',
        px: '0.9rem',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease',
        '&:hover': {
          backgroundColor: 'transparent',
          color: hoverColor,
        },
      }}
    >
      {isActive && (
        <Box
          component={motion.div}
          layoutId="nav-pill"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '8px',
            backgroundColor: pillBg,
            zIndex: 0,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        />
      )}
      <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Button>
  );
}

export default NavButton;
