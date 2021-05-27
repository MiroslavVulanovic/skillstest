import React from 'react';
import {makeStyles} from '@material-ui/core/styles'; 
import {Typography} from '@material-ui/core';
import './RegistrationMessage.css';

const useStyles = makeStyles({
  mainContainer: {
    display: 'grid',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5
  }
})

const RegistrationMessage = () => {

  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
        <Typography
          variant='h6'
          className='blink-text'
        >
          Congratulations! You have successfully completed the registration process!
        </Typography>
      </div>
  )
}

export default RegistrationMessage
