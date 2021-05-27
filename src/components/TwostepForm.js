import React, {useState} from 'react';
import {Stepper, Step, StepLabel, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import RegistrationMessage from './RegistrationMessage';

const useStyles = makeStyles({
  formFormat: {
    position: 'relative',
    width: '35%',
    margin: '1rem auto',
    background: 'white',
    opacity: '.9',
    border: '1px solid #999',
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: 'red'
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: 'red'
    }
  },
  stepperFormat: {
    margin: '0 auto'
  }
})

const TwostepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  function getSteps(){
    return ['STEP 1', 'STEP 2'];
  }

  const handleNext = () => {
    setActiveStep(prevActvieStep => prevActvieStep + 1);
  }

  const steps = getSteps();

  function getStepContent(stepIndex){
    switch(stepIndex){
      case 0:
        return <StepOne
                  handleNext={handleNext}
                  activeStep={activeStep}
                  steps={steps}
               />;
      case 1:
        return <StepTwo 
                  handleNext={handleNext}
                  activeStep={activeStep}
                  steps={steps}
               />;
      default:
        return 'Unknown component';
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.formFormat}>
      <Stepper className={classes.stepperFormat} activeStep={activeStep} alternativeLabel >
        {steps.map(label=>(
          <Step key={label}>
            <StepLabel>
            {label}
            </StepLabel>
          </Step>
        ))
        }
      </Stepper>
      <>
        {activeStep === steps.length ? (<RegistrationMessage />) : (  
          <>
            {getStepContent(activeStep)}
          </>
        )}
      </>
    </div>
  )
}

export default TwostepForm
