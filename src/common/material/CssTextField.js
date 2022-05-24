import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CssTextField = styled(TextField)({
    '& label': {
        color: 'white',
    },
    '& input': {
        color: 'white'
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
   
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        color: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
        
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
    
      },
    },
  });