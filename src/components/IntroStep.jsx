import React, { useState, useEffect } from 'react';
import styles from './IntroStep.module.css';
import manImg from '../assets/man.png';

const IntroStep = ({ onDone }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 순차적으로 텍스트를 나타나게 하기 위한 타이머
    const timers = [
      setTimeout(() => setStep(1), 800),  // 너.. 오늘
      setTimeout(() => setStep(2), 1600), // 스트레스 받았구나
      setTimeout(() => setStep(3), 2400), // 다 털어놔봐
      setTimeout(() => setStep(4), 3200), // 아무데나 클릭하기
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.container} onClick={step > 0 ? onDone : undefined}>
      <div className={styles.inner}>
        {/* 텍스트 영역 */}
      <div className={styles.textArea}>
        <p className={`${styles.text} ${step >= 1 ? styles.visible : ''}`}>너.. 오늘</p>
        <p className={`${styles.text} ${step >= 2 ? styles.visible : ''}`}>스트레스 받았구나</p>
        <p className={`${styles.text} ${step >= 3 ? styles.visible : ''}`}>다 털어놔봐</p>
        <p className={`${styles.subText} ${step >= 4 ? styles.visible : ''}`}>아무데나 클릭하기</p>
      </div>

        <div className={styles.characterArea}>
          <img src={manImg} alt="소년" className={styles.character} />
        </div>
      </div>
    </div>
  );
};

export default IntroStep;
