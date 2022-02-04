import { Box } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStyle from './useStyles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Divider } from '@mui/material';

function ProfileCard(): JSX.Element {
  const list = {
    name: 'Babra John',
    tagLine: 'Loving pet sitter',
    description:
      'The work of writing is simply this untangling the dependencies among the parts of a topic, and presenting those parts in a logical stream that enables the reader to understand you.',
    location: 'Maryland',
    price: '10/Hr',
  };
  const classes = useStyle();
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia>
          <Avatar
            src="https://th.bing.com/th/id/R.ea1b9ab324ce1e392dab4771e9524042?rik=iHtWE4I7L9%2bcaQ&pid=ImgRaw&r=0"
            alt="green iguana"
            className={classes.profileImage}
            sx={{ width: 100, height: 100 }}
          />
        </CardMedia>
        <CardContent className={classes.profileDetails}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', fontSize: 18 }}>
            {list.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {list.tagLine}
          </Typography>
          <Rating name="size-medium" defaultValue={2} readOnly />
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', fontSize: 12 }}>
            {list.description.substring(0, 90)}
          </Typography>
        </CardContent>
        <Divider />
        <Box className={classes.footer}>
          <LocationOnIcon sx={{ color: 'pink' }} className={classes.location} />
          <Typography variant="body2" color="text.secondary" className={classes.locationName}>
            {list.location}
          </Typography>
          <Typography
            gutterBottom
            className={classes.price}
            variant="h5"
            sx={{ fontWeight: '500', fontSize: 15, marginLeft: 20 }}
          >
            {list.price}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProfileCard;
