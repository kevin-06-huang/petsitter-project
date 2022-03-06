import { ImageList, ImageListItem } from '@mui/material';
import { useStyles } from './useStyle';

const ProfileGallery = ({ images }: { images: string[] }): JSX.Element => {
  const classes = useStyles();
  return (
    <ImageList cols={5}>
      {images.map((image) => (
        <ImageListItem key={image} className={classes.image}>
          <img src={image} alt="image" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProfileGallery;
