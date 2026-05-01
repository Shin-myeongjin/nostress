import React, { useState } from 'react';
import InputStep from './components/InputStep';
import CrumpleStep from './components/CrumpleStep';
import ThrowStep from './components/ThrowStep';
import ResultStep from './components/ResultStep';

// step: 'input' | 'crumple' | 'throw' | 'result'
const App = () => {
  const [step, setStep] = useState('input');
  const [items, setItems] = useState([]);
  const [chargeLevel, setChargeLevel] = useState(0);

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
    setStep('input');
  };

  return (
    <>
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
