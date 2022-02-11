import { Button, TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useStyle from './useStyles';
import Typography from '@mui/material/Typography';
import ProfileCard from './profileCard/ProfileCard';
import SearchBar from './searchBar';
function ProfileList(): JSX.Element {
  const classes = useStyle();
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Box className={classes.title}>
        <Typography gutterBottom variant="h1" component="div" sx={{ fontWeight: '500', fontSize: 30 }}>
          Your search results
        </Typography>
      </Box>
      <SearchBar />
      <Grid
        className={classes.box}
        container
        spacing={3}
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 5, md: 5 }}
        alignItems="center"
        justifyContent="center"
      >
        {cards.map((card) => (
          <Box key={card} className={classes.card}>
            <ProfileCard />
          </Box>
        ))}
      </Grid>
      <Box textAlign="center" marginTop={5} className={classes.showMore}>
        <Button
          sx={{ background: 'none', color: 'black', border: '1px solid #dbdbdb' }}
          type="submit"
          size="large"
          variant="contained"
          className={classes.submit}
          disableElevation
        >
          show more
        </Button>
      </Box>
    </>
  );
}

export default ProfileList;
