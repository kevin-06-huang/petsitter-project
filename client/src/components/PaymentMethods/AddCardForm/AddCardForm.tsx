import { useFormik } from 'formik';
import { CardElement } from '@stripe/react-stripe-js';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FormInput from '../../FormInput/FormInput';
import { useStyles } from './useStyle';

interface Props {
  open: boolean;
  close: () => void;
  saveCard: (value: { name: string }) => Promise<void>;
}

const AddCardForm = ({ open, close, saveCard }: Props): JSX.Element => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: saveCard,
  });
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add New Payment Profile</DialogTitle>
      <DialogContent>
        <form
          id="card"
          className={classes.addCardForm}
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit(event);
            close();
          }}
        >
          <FormInput
            id="name"
            label="Name"
            margin="normal"
            name="name"
            placeholder="name on card"
            onChange={formik.handleChange}
          />
          <CardElement />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={close} type="submit" form="card">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardForm;
