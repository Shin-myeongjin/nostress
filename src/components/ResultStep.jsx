import React, { useEffect, useState } from 'react';
import { getRandomMessage } from '../data/messages';
import styles from './ResultStep.module.css';

const ResultStep = ({ chargeLevel, onReset }) => {
  const [msg] = useState(() => getRandomMessage());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const power = Math.round(chargeLevel * 100);
  const powerLabel =
    power < 30 ? '살짝 힘들었구나 🥺' :
    power < 60 ? '꽤 힘들었네 😤' :
    power < 85 ? '많이 힘들었다 😭' :
    '진짜 많이 힘들었구나 😱';

  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      {/* 별 폭죽 */}
      <div className={styles.stars}>
        {'✦✧✦✧✦✧✦✧✦✧'.split('').map((s, i) => (
          <span key={i} className={styles.star} style={{ '--d': `${i * 0.15}s`, '--x': `${(i % 5) * 20}%` }}>{s}</span>
        ))}
      </div>

      <div className={styles.card}>
        {/* 투척 파워 */}
        <div className={styles.power}>
          <div className={styles.powerBar}>
            <div className={styles.powerFill} style={{ width: `${power}%` }} />
          </div>
          <p className={styles.powerLabel}>{powerLabel}</p>
        </div>

        {/* 위로 메시지 */}
        <div className={styles.message}>
          <h2 className={styles.msgTitle}>{msg.title}</h2>
          <p className={styles.msgBody}>{msg.body}</p>
        </div>

        {/* 이모지 */}
        <div className={styles.emoji}>🌟</div>
      </div>

      <button className={styles.resetBtn} onClick={onReset}>
        한번 더 털어버릴래 🔄
      </button>
    </div>
  );
};

export default ResultStep;
