import { Box } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStyle from './useStyles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Divider } from '@mui/material';

interface Props {
  image?: string;
  name: string;
  rating?: string;
  slogan?: string;
  description?: string;
  address?: string;
  price?: string;
  tagLine?: string;
  photo?: string;
}
function ProfileCard({ photo, name, rating, tagLine, description, address, price }: Props): JSX.Element {

  const classes = useStyle();
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia>
          <Avatar src={photo} alt="green iguana" className={classes.profileImage} sx={{ width: 100, height: 100 }} />
        </CardMedia>
        <CardContent className={classes.profileDetails}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', fontSize: 18 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tagLine}
          </Typography>
          <Rating name="size-medium" defaultValue={parseFloat(rating as string)} readOnly />
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', fontSize: 12 }}>
            {description?.substring(0, 90)}
          </Typography>
        </CardContent>
        <Divider />
        <Box className={classes.footer}>
          <LocationOnIcon sx={{ color: 'pink' }} className={classes.location} />
          <Typography variant="body2" color="text.secondary" className={classes.locationName}>
            {address}
          </Typography>
          <Typography
            gutterBottom
            className={classes.price}
            variant="h5"
            sx={{ fontWeight: '500', fontSize: 15, marginLeft: 10 }}
          >
            ${price}/Hr
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProfileCard;
