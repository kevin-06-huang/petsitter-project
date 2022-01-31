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
            Jessica Parker
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loving pet sitter
          </Typography>
          <Rating name="size-medium" defaultValue={2} />
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', fontSize: 12 }}>
            The work of writing is simply this: untangling the dependencies among the parts of a topic, and presenting
            those parts in a logical stream that enables the reader to understand you.
          </Typography>
        </CardContent>
        <Divider />
        <Box className={classes.footer}>
          <LocationOnIcon sx={{ color: 'pink' }} className={classes.location} />
          <Typography variant="body2" color="text.secondary" className={classes.locationName}>
            Gaithersburg,Maryland
          </Typography>
          <Typography
            gutterBottom
            className={classes.price}
            variant="h5"
            sx={{ fontWeight: '500', fontSize: 15, marginLeft: 10 }}
          >
            30/Hr
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProfileCard;
