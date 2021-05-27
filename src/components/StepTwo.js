import React, {useState} from 'react';
import useForm from './useForm';
import {makeStyles} from '@material-ui/core/styles'; 
import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import BlockSharpIcon from '@material-ui/icons/BlockSharp';

const useStyles = makeStyles({
  mainContainer: {
    display: 'grid',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10
  },
  formContainer: {
    position: 'relative',
    width: '22rem',
    height: 'auto',
    padding: '.5rem'
  },
  inputField: {
    width: '100%',
    margin: '.4rem 0'
  },
  btn: {
    width: '100%',
    height: '2.8rem',
    color: '#fff',
    background: 'red',
    marginTop: '.3rem',
    '&:hover': {
      background: 'red',
      opacity: '.7',
      transition: '.3s ease-in-out'
    }
  },
  disabledBtn: {
    background: 'rgba(0,0,0, 0.38)',
    width: '100%',
    height: '2.8rem',
    marginTop: '.3rem'
  }
})

const StepTwo = ({handleNext, activeStep, steps}) => {

  const [state, setState] = useState({
    checked: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const stateSchema = {
    address: {value: '', error: ''},
    username: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirmpasword: {value: '', error: ''}
  }

  const stateValidatorSchema = {
    address: {
      required: true,
      validator: {
        func: value => /^.{0,50}$/.test(value),
        error: 'Address can contain up to 50 characters!'
      }
    },
    username: {
      required: true,
      validator: {
        func: value => /^.{4,20}$/.test(value),
        error: 'Username must contain between 4 and 20 characters!'
      }
    },
    email: {
      required: true,
      validator: {
        func: value => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value),
        error: 'You must enter valid email format!'
      }
    },
    password: {
      required: true,
      validator: {
        func: value => /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(value),
        error: 'Password must contain between 8 and 16 characters and use at least one uppercase letter, one lowercase letter, one scpecial character and one number!'
      }
    },
    password: {
      required: true,
      validator: {
        func: value => /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(value),
        error: 'Password must contain between 8 and 16 characters and use at least one scpecial character!'
      }
    }
  }

  const {values, errors, dirty, handleOnChange} = useForm(stateSchema, stateValidatorSchema);

  const {address, username, email, password, confirmpassword} = values;

  const [showPasswordValue, setShowPasswordValue] = useState({
    showPassword: false
  });
  const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState({
    showConfirmPassword: false
  });

  const handleClickShowPassword = () => {
    setShowPasswordValue({
      showPassword: !showPasswordValue.showPassword
    })
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPasswordValue({
      showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword
    })
  }

  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Typography
        variant='h6'
        style={{color: '#999', textAlign: 'center'}}
      >
        Register and win a bonus!
      </Typography>
      <div className={classes.formContainer}>
        <form>
          <TextField 
            className={classes.inputField}
            label='Address'
            variant='outlined'
            name='address'
            value={address}
            onChange={handleOnChange}
          />
          {errors.address && dirty.address && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.address}
            </Typography>
          )}
          <TextField 
            className={classes.inputField}
            label='Username'
            variant='outlined'
            name='username'
            value={username}
            onChange={handleOnChange}
          />
          {errors.username && dirty.username && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.username}
            </Typography>
          )}
          <TextField 
            className={classes.inputField}
            label='Email'
            variant='outlined'
            name='email'
            value={email}
            onChange={handleOnChange}
          />
          {errors.email && dirty.email && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.email}
            </Typography>
          )}
          <FormControl className={classes.inputField} variant='outlined'>
            <InputLabel>Password</InputLabel>
            <OutlinedInput 
              labelWidth={70}
              name='password'
              value={password}
              onChange={handleOnChange}
              type={showPasswordValue.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <iconButton 
                    edge='end'
                    onClick={handleClickShowPassword}
                  >
                    {showPasswordValue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </iconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password && dirty.password && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.password}
            </Typography>
          )}
          <FormControl className={classes.inputField} variant='outlined'>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput 
              labelWidth={135}
              name='confirmpassword'
              value={confirmpassword}
              onChange={handleOnChange}
              type={showConfirmPasswordValue.showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <iconButton 
                    edge='end'
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPasswordValue.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </iconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {password && confirmpassword !== password ? (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              Password do not match!</Typography>
          ) : null}
          <>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checked}
                onChange={handleChange}
                name="checked"
                color="primary"
              />
            }
            style={{color: '#999'}}
            label="Terms and condition"
          />
          {
            !address || 
            !username || 
            !email || 
            !password || 
            !confirmpassword || 
            (errors.address && dirty.address) || 
            (errors.username && dirty.username) ||
            (errors.email && dirty.email) ||
            (errors.password && dirty.password) ||
            (errors.confirmpassword && dirty.confirmpassword) ||
            !state.checked ? 
              (
              <Button
                className={classes.disabledBtn}
                variant='contained'
                disabled
                type='submit'
                endIcon={<BlockSharpIcon />}
              >
                SIGN UP
              </Button>
              ) : (
                <Button
                className={classes.btn}
                variant='contained'
                onClick={handleNext}
                type='submit'
                endIcon={<SendSharpIcon />}
              >
                SIGN UP
              </Button>
              )
          }
          </>
        </form>
      </div>
    </div>
  )
}

export default StepTwo
