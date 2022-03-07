import { Grid, Box } from '@mui/material';
import useStyle from './useStyles';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { Profile } from '../../interface/Profile';
interface Props {
  profiles: [Profile];
}
const SearchDisplay = ({ profiles }: Props) => {
  const classes = useStyle();

  return (
    <Grid
      className={classes.box}
      container
      spacing={3}
      rowSpacing={1}
      columnSpacing={{ xs: 2, sm: 5, md: 5 }}
      alignItems="center"
      justifyContent="center"
    >
      {[1, 2, 3, 4, 5, 6].map((card) => (
        <Box key={card} className={classes.card}>
          <ProfileCard name={`${card}`} />
        </Box>
      ))}
    </Grid>
  );
};

export default SearchDisplay;
