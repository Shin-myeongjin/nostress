import React, { useEffect, useState } from 'react';
import styles from './CrumpleStep.module.css';

const CrumpleStep = ({ items, onDone }) => {
  const [phase, setPhase] = useState('crumpling'); // 'crumpling' | 'done'

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase('done');
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {phase === 'crumpling' ? '꾸깃꾸깃...' : '다 구겨졌어!'}
      </p>

      <div className={`${styles.paperWrap} ${phase === 'done' ? styles.crumpled : ''}`}>
        {phase === 'crumpling' && (
          <div className={styles.paperSheet}>
            <ul className={styles.list}>
              {items.map((item, i) => (
                <li key={i}>✦ {item}</li>
              ))}
            </ul>
          </div>
        )}
        {phase === 'done' && (
          <div className={styles.ball}>🗒️</div>
        )}
      </div>
    </div>
  );
};

export default CrumpleStep;
