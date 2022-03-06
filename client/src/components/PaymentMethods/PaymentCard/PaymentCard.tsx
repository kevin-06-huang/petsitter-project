import { Box, Card, CardMedia, Typography } from '@mui/material';
import { PaymentMethod } from '@stripe/stripe-js';
import visaLogo from '../../../images/paymentMethodIcons/Visa_Brandmark_Blue_RGB_2021.png';
import mcLogo from '../../../images/paymentMethodIcons/mc_symbol_opt_73_3x.png';
import { useStyles } from './useStyle';

const PaymentCard = ({ cardElement }: { cardElement: PaymentMethod }): JSX.Element => {
  const classes = useStyles();

  const getCardLogo = (brand: string | undefined) => {
    switch (brand) {
      case 'visa':
        return visaLogo;
      case 'mastercard':
        return mcLogo;
    }
  };

  return (
    <Card className={classes.paymentCard}>
      <CardMedia style={{ width: '30%' }} component="img" image={getCardLogo(cardElement?.card?.brand)} />
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>**** **** **** {cardElement?.card?.last4}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'gray' }}>
          Exp. Date {cardElement?.card?.exp_month}/{cardElement?.card?.exp_year}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 'bold' }}>{cardElement?.billing_details.name}</Typography>
    </Card>
  );
};

export default PaymentCard;
