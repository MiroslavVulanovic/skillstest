import React from 'react';
import useForm from './useForm';
import {makeStyles} from '@material-ui/core/styles'; 
import {
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';

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
    padding: '2rem'
  },
  inputField: {
    width: '100%',
    margin: '1rem 0'
  },
  btn: {
    width: '100%',
    height: '3rem',
    color: '#fff',
    background: 'red',
    '&:hover': {
      background: 'red',
      opacity: '.7',
      transition: '.3s ease-in-out'
    }
  },
  disabledBtn: {
    background: 'rgba(0,0,0, 0.38)',
    width: '100%',
    height: '3rem'
  }
})

const StepOne = ({handleNext, activeStep, steps}) => {

  const stateSchema = {
    firstname: {value: '', error: ''},
    lastname: {value: '', error: ''}
  }

  const stateValidatorSchema = {
    firstname: {
      required: true,
      validator: {
        func: value => /^.{2,25}$/.test(value),
        error: 'First Name must contain between 2 and 25 characters!'
      }
    },
    lastname: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z]{2,25}$/.test(value),
        error: 'Last Name must contain between 2 and 25 letters!'
      }
    }
  }

  const {values, errors, dirty, handleOnChange} = useForm(stateSchema, stateValidatorSchema);

  const {firstname, lastname} = values;

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
            label='First Name'
            variant='outlined'
            name='firstname'
            value={firstname}
            onChange={handleOnChange}
          />
          {errors.firstname && dirty.firstname && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.firstname}
            </Typography>
          )}
          <TextField 
            className={classes.inputField}
            label='Last Name'
            variant='outlined'
            name='lastname'
            value={lastname}
            onChange={handleOnChange}
          />
          {errors.lastname && dirty.lastname && (
            <Typography
              style = {{marginTop: '0', color: 'red', fontWeight: '200'}}
            >
              {errors.lastname}
            </Typography>
          )}
          <>
          {
            !firstname || 
            !lastname || 
            (errors.lastname && dirty.lastname) || 
            (errors.firstname && dirty.firstname) ? 
              (
              <Button
                className={classes.disabledBtn}
                variant='contained'
                disabled
                type='submit'
                endIcon={<ArrowForwardSharpIcon />}
              >
                NEXT
              </Button>
              ) : (
              <Button
                className={classes.btn}
                variant='contained'
                onClick={handleNext}
                type='submit'
                endIcon={<ArrowForwardSharpIcon />}
              >
                NEXT
              </Button>
              )
          }
          </>
        </form>
      </div>
    </div>
  )
}

export default StepOne
