import React, { useState } from 'react';
import IntroStep from './components/IntroStep';
import InputStep from './components/InputStep';
import CrumpleStep from './components/CrumpleStep';
import ThrowStep from './components/ThrowStep';
import ResultStep from './components/ResultStep';

// step: 'intro' | 'input' | 'crumple' | 'throw' | 'result'
const App = () => {
  const [step, setStep] = useState('intro');
  const [items, setItems] = useState([]);
  const [chargeLevel, setChargeLevel] = useState(0);

  const handleIntroDone = () => {
    setStep('input');
  };

  const handleInputDone = (stressItems) => {
    setItems(stressItems);
    setStep('crumple');
  };

  const handleCrumpleDone = () => {
    setStep('throw');
  };

  const handleThrow = (level) => {
    setChargeLevel(level);
    setStep('result');
  };

  const handleReset = () => {
    setItems([]);
    setChargeLevel(0);
    setStep('intro');
  };

  return (
    <>
      {step === 'intro' && (
        <IntroStep onDone={handleIntroDone} />
      )}
      {step === 'input' && (
        <InputStep onDone={handleInputDone} />
      )}
      {step === 'crumple' && (
        <CrumpleStep items={items} onDone={handleCrumpleDone} />
      )}
      {step === 'throw' && (
        <ThrowStep onThrow={handleThrow} />
      )}
      {step === 'result' && (
        <ResultStep chargeLevel={chargeLevel} onReset={handleReset} />
      )}
    </>
  );
};

export default App;
