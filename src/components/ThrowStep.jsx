import React, { useState, useRef, useEffect, useCallback } from 'react';
import Stickman from './Stickman';
import styles from './ThrowStep.module.css';

const MAX_HOLD = 3000; // 최대 3초

const ThrowStep = ({ onThrow }) => {
  const [phase, setPhase] = useState('enter'); // 'enter'|'hold'|'flying'
  const [charge, setCharge] = useState(0); // 0~1
  const [ballY, setBallY] = useState(0);
  const [walkX, setWalkX] = useState(-120);

  // 클로저 문제 방지: phase를 ref로도 관리
  const phaseRef = useRef('enter');
  const pressStartRef = useRef(null);
  const chargeRafRef = useRef(null);
  const walkRafRef = useRef(null);
  const onThrowRef = useRef(onThrow);
  onThrowRef.current = onThrow;

  const setPhaseSync = (p) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // 졸라맨 등장 애니메이션
  useEffect(() => {
    let current = -120;
    const step = () => {
      current += 5;
      if (current >= 0) {
        setWalkX(0);
        setPhaseSync('hold');
        return;
      }
      setWalkX(current);
      walkRafRef.current = requestAnimationFrame(step);
    };
    walkRafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(walkRafRef.current);
  }, []);

  // 게이지 채우기 - phaseRef로 최신 상태 참조
  const startCharge = useCallback((e) => {
    e.preventDefault();
    if (phaseRef.current !== 'hold') return;
    pressStartRef.current = Date.now();

    const update = () => {
      if (!pressStartRef.current) return;
      const elapsed = Date.now() - pressStartRef.current;
      const level = Math.min(elapsed / MAX_HOLD, 1);
      setCharge(level);
      if (level < 1) {
        chargeRafRef.current = requestAnimationFrame(update);
      }
    };
    chargeRafRef.current = requestAnimationFrame(update);
  }, []);

  // 던지기 - phaseRef로 최신 상태 참조
  const releaseCharge = useCallback((e) => {
    e.preventDefault();
    if (!pressStartRef.current || phaseRef.current !== 'hold') return;
    cancelAnimationFrame(chargeRafRef.current);

    const elapsed = Date.now() - pressStartRef.current;
    const level = Math.min(elapsed / MAX_HOLD, 1);
    pressStartRef.current = null;

    if (level < 0.05) {
      setCharge(0);
      return;
    }

    setPhaseSync('flying');
    setCharge(0);

    const maxDist = 750;
    const dist = Math.round(level * maxDist);
    let current = 0;
    const speed = 12 + level * 14;
    const fly = () => {
      current += speed;
      setBallY(current);
      if (current < dist) {
        requestAnimationFrame(fly);
      } else {
        setTimeout(() => onThrowRef.current(level), 500);
      }
    };
    requestAnimationFrame(fly);
  }, []);

  const stickmanPose =
    phase === 'flying' ? 'throw' :
    charge > 0.05 ? 'charge' :
    phase === 'enter' ? 'walk' : 'hold';

  return (
    <div
      className={styles.container}
      onPointerDown={startCharge}
      onPointerUp={releaseCharge}
      onPointerLeave={releaseCharge}
      onPointerCancel={releaseCharge}
    >
      {/* 안내 텍스트 */}
      <div className={styles.guide}>
        {phase === 'enter' && <p>오는 중이야...</p>}
        {phase === 'hold' && charge === 0 && <p>화면을 꾹 눌러봐! 👇</p>}
        {phase === 'hold' && charge > 0 && <p>더 꾹!! {Math.round(charge * 100)}%</p>}
        {phase === 'flying' && <p>슝~! 🚀</p>}
      </div>

      {/* 날아가는 종이뭉치 */}
      {phase === 'flying' && (
        <div
          className={styles.flyingBall}
          style={{ bottom: `calc(200px + ${ballY}px)` }}
        >
          🗒️
        </div>
      )}

      {/* 게이지 바 */}
      {phase === 'hold' && (
        <div className={styles.gaugeWrap}>
          <div className={styles.gaugeBar}>
            <div
              className={styles.gaugeFill}
              style={{ width: `${charge * 100}%` }}
            />
          </div>
          <p className={styles.gaugeLabel}>손 떼면 날아가!</p>
        </div>
      )}

      {/* 졸라맨 */}
      <div
        className={styles.stickmanWrap}
        style={{ transform: `translateX(${walkX}px)` }}
      >
        <Stickman pose={stickmanPose} chargeLevel={charge} />
      </div>

      {/* 바닥 */}
      <div className={styles.ground} />
    </div>
  );
};

export default ThrowStep;
