import React from 'react';
import { useSelector } from 'react-redux';
import Step1Name from './steps/Step1Name';
import Step2Wheels from './steps/Step2Wheels';
import Step3Type from './steps/Step3Type';
import Step4Model from './steps/Step4Model';
import Step5Date from './steps/Step5Date';
import BookingConfirmation from './BookingConfirmation ';

const FormContainer = () => {
  const { currentStep, bookingStatus } = useSelector((state) => state.form);

  if (bookingStatus === 'succeeded') {
    return <BookingConfirmation />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Name />;
      case 2:
        return <Step2Wheels />;
      case 3:
        return <Step3Type />;
      case 4:
        return <Step4Model />;
      case 5:
        return <Step5Date />;
      default:
        return <Step1Name />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default FormContainer;
