import React from 'react';
import { Box, Paper } from '@mui/material';
import AuthPageHeader from '../AuthPageHeader/AuthPageHeader';

interface AuthPageWrapperProps {
  header: string;
  children: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ header, children }) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        minHeight: 700,
        margin: '0 auto',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow:
          '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
      }}
      component={Paper}
    >
      <AuthPageHeader header={header} />
      <Box
        sx={{
          width: 350,
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthPageWrapper;
