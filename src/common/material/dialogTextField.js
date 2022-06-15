import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles'

export const dialogTextField = styled(TextField)({
    '& label': {
        color: 'black',
    },
    '& input': {
        color: 'black'
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });