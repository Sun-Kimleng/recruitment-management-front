import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles'
import { ApiKey } from '../../api/apiKey';

export const CssTextField = styled(TextField)({
    '& label': {
        color: 'gray',
    },
    '& input': {
        color: 'black'
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
   
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
        color: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
        
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
    
      },
    },
  });

  