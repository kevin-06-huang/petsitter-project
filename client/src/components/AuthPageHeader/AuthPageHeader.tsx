import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface AuthPageHeaderProps {
  header: string;
}

const AuthPageHeader: React.FC<AuthPageHeaderProps> = ({ header }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {header}
      </Typography>
    </Box>
  );
};

export default AuthPageHeader;
