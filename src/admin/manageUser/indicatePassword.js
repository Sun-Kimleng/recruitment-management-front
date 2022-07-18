import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const IndicatePassword = ({checkLength, checkUpperCase, checkLowerCase, checkDigit, checkSpecialChar, triggerPwSuggestion}) => {

    return ( 
        <div className="indicate-password">
            {triggerPwSuggestion && <>
            <b>Password suggestion</b>
            
            <div className="val-check">
                <div className="lowercase">
                {checkLowerCase === 'valid'
                    ?
                    <div style={{color: '#388e3c'}}><CheckBoxIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one lowercase </div>
                    : 
                    <div style={{color: '#d32f2f'}}><DangerousIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one lowercase </div>
                }
                </div>
            </div>
            
            <div className="val-check">
                <div className="length">
                    {
                        checkLength === 'valid'
                        ?
                        <div style={{color: '#388e3c'}}><CheckBoxIcon style={{fontSize: '20px', marginTop: '-3px'}}/> Minimum 8 characters </div>
                        :
                        <div style={{color: '#d32f2f'}}><DangerousIcon style={{fontSize: '20px', marginTop: '-3px'}}/> Minimum 8 characters </div>
                    }
                </div>
            </div>

            <div className="val-check">
                <div className="uppercase">
                    {
                    checkUpperCase === 'valid'
                    ?
                    <div style={{color: '#388e3c'}}><CheckBoxIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one uppercase </div>
                    :    
                    <div style={{color: '#d32f2f'}}><DangerousIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one uppercase </div>
                    }
                </div>
            </div>

            <div className="val-check">
                <div className="digit">
                {checkDigit === 'valid'
                    ?
                    <div style={{color: '#388e3c'}}><CheckBoxIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one digit </div>
                    : 
                    <div style={{color: '#d32f2f'}}><DangerousIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At lease one digit </div>
                }
                </div>
            </div>

            <div className="val-check">
                <div className="specialchar">
                {
                    checkSpecialChar === 'valid'
                    ?
                    <div style={{color: '#388e3c'}}><CheckBoxIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At least one specail characters</div>
                    : 
                    <div style={{color: '#d32f2f'}}><DangerousIcon style={{fontSize: '20px', marginTop: '-3px'}}/> At lease one special characters </div>
                }
                </div>
            </div>
            </>}
        </div>
     );
}
 
export default IndicatePassword;