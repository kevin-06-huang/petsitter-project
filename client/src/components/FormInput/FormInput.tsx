import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
}));

interface FormInputProps {
  label: string;

  defaultValue?: any;
  id: string;
  select?: boolean;
  selectOptions?: Array<{ label: string; value: string }> | undefined;
  selectValue?: string;

  [inputProps: string]: any;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  select,
  selectOptions,
  selectValue,
  defaultValue,
  ...rest
}) => {
  return (
    <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
      <InputLabel
        sx={{
          fontSize: 16,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#000',
        }}
        shrink
        htmlFor={id}
      >
        {label}
      </InputLabel>
      {select && selectOptions && selectOptions.length >= 1 ? (
        <Select value={selectValue} input={<StyledInput />} {...rest}>
          {selectOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <StyledInput defaultValue={defaultValue} id={id} {...rest} />
      )}
    </FormControl>
  );
};

export default FormInput;
