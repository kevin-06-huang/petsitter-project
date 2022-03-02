import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyle from './useStyles';
import { Profile } from '../../interface/ProfileApiData';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ProfileCard from './profileCard/ProfileCard';
import { getAllSitters } from '../../helpers/APICalls/getSitter';
import SearchBar from './searchBar';

function ProfileList(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyle();
  const [location, setLocation] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filterprofiles, setFilterProfiles] = useState<Profile[]>([]);
  const [addMore, setAddMore] = useState<Profile[]>([]);
  const [disable, setDisable] = useState(true);
  const [noRecord, setNoRecord] = useState('');
  useEffect(() => {
    setAddMore([]);
  }, [location]);
  const saveProfiles = async (profilesData: Profile[]) => {
    setProfiles([]);
    setFilterProfiles([]);
    addMore.length = 0;
    const length = profilesData.length;
    setProfiles([...profilesData]);
    setFilterProfiles([...profilesData]);
    const data = profilesData.splice(0, 6);
    data.map((ele) => {
      addMore.push(ele);
    });
    setAddMore([...addMore]);
    setDisable(false);
    if (length > addMore.length) {
      const btn = document.getElementById('showMore') as HTMLElement;
      btn.style.display = 'block';
    }
  };
  const changeLocation = (e: any) => {
    setLocation(e.target.value);
    const btn = document.getElementById('showMore') as HTMLElement;
    btn.style.display = 'none';
  };
  const handleShowMore = () => {
    setProfiles([...filterprofiles]);
    if (filterprofiles.length - 1 >= addMore.length) {
      const data = profiles.splice(addMore.length, 6);
      data.map((ele) => {
        addMore.push(ele);
      });
      setAddMore([...addMore]);
      if (filterprofiles.length <= addMore.length) setDisable(true);
    } else {
      setDisable(true);
    }
  };
  const getAllProfiles = () => {
    getAllSitters(location).then((response) => {
      if (response.error) {
        updateSnackBarMessage(JSON.stringify(response.error));
      } else if (response.success) {
        setNoRecord('');
        saveProfiles(response.success.profiles as Profile[]);
      } else {
        setNoRecord('No record found');
        updateSnackBarMessage('An unexpected error has occurred. Please try again later.');
      }
    });
  };
  return (
    <>
      <Box className={classes.title}>
        <Typography gutterBottom variant="h1" component="div" sx={{ fontWeight: '500', fontSize: 30 }}>
          Your search results
        </Typography>
      </Box>
      <SearchBar location={location} changeLocation={changeLocation} getAllProfiles={getAllProfiles} />
      <Grid
        className={classes.box}
        container
        spacing={3}
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 5, md: 5 }}
        alignItems="center"
        justifyContent="center"
      >
        {profiles.length ? (
          addMore.map(({ _id, photo, address, description, name, rating, gender, phoneNumber, price, tagLine }) => (
            <Box key={_id} className={classes.card}>
              <ProfileCard
                key={_id}
                image="https://th.bing.com/th/id/R.ea1b9ab324ce1e392dab4771e9524042?rik=iHtWE4I7L9%2bcaQ&pid=ImgRaw&r=0"
                name={name}
                rating={rating}
                tagLine={tagLine}
                description={description}
                address={address}
                price={price}
                photo={photo}
              />
            </Box>
          ))
        ) : (
          <Box className={classes.title}>
            <Typography gutterBottom variant="h1" component="div" sx={{ fontWeight: '500', fontSize: 30 }}>
              {noRecord}
            </Typography>
          </Box>
        )}
      </Grid>
      <Box textAlign="center" id="showMore" marginTop={5} className={classes.showMore}>
        <Button
          sx={{ background: 'none', color: 'black', border: '1px solid #dbdbdb' }}
          type="submit"
          size="large"
          variant="contained"
          className={classes.submit}
          disableElevation
          onClick={handleShowMore}
          disabled={disable}
        >
          show more
        </Button>
      </Box>
    </>
  );
}

export default ProfileList;
