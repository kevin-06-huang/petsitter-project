import { Box, Button, Snackbar, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod, StripeCardElement } from '@stripe/stripe-js';
import { useState } from 'react';
import AddCardForm from './AddCardForm/AddCardForm';
import PaymentCard from './PaymentCard/PaymentCard';
import { useStyles } from './useStyle';

const PaymentMethods = (): JSX.Element => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [cardElement, setCardElement] = useState<PaymentMethod>();
  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (value: { name: string }) => {
    if (stripe && elements) {
      await stripe
        .createPaymentMethod({
          billing_details: { name: value.name },
          type: 'card',
          card: elements.getElement(CardElement) as StripeCardElement,
        })
        .then((data) => {
          setCardElement(data.paymentMethod);
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setSnackbarMessage(error);
        });
    }
  };

  const handleAddPaymentOpen = () => {
    setOpenAddPayment(true);
  };

  const handleAddPaymentClose = () => {
    setOpenAddPayment(false);
  };

  return (
    <Box className={classes.card}>
      <Typography variant="h4">Payment Methods</Typography>
      <Box className={classes.paymentCards}>
        <Typography variant="subtitle2" className={classes.label}>
          Saved Payment Profiles:
        </Typography>
        {cardElement ? (
          <PaymentCard cardElement={cardElement} />
        ) : (
          <Typography>{"You don't have any saved payment method"}</Typography>
        )}
      </Box>
      <Button variant="outlined" className={classes.button} sx={{ padding: '20px' }} onClick={handleAddPaymentOpen}>
        Add new payment profile
      </Button>
      <AddCardForm open={openAddPayment} close={handleAddPaymentClose} saveCard={handleSubmit} />
      <Snackbar open={snackbarOpen} autoHideDuration={1000} message={snackbarMessage} />
    </Box>
  );
};

export default PaymentMethods;
