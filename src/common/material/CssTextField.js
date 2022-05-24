import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles'
import { ApiKey } from '../../api/apiKey';

export const CssTextField = styled(TextField)({
    '& label': {
        color: 'gray',
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
        borderColor: 'gray',
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

  