import { Typography, Box, Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';

interface AuthPageFooterProps {
  text: string;
  anchorText: string;
  anchorTo: string;
}

const AuthPageFooter: React.FC<AuthPageFooterProps> = ({ text, anchorText, anchorTo }) => {
  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        marginTop: 4,
        fontSize: 20,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {text}{' '}
        <Link component={RouteLink} to={anchorTo}>
          {anchorText}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthPageFooter;
