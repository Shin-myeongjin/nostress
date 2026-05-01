import React from 'react';

// 졸라맨 SVG 컴포넌트
// pose: 'walk' | 'hold' | 'charge' | 'throw'
const Stickman = ({ pose = 'hold', chargeLevel = 0 }) => {
  // chargeLevel: 0~1

  const armAngle = pose === 'charge'
    ? -40 - chargeLevel * 40  // 뒤로 당기기
    : pose === 'throw'
    ? 80                        // 위로 던지기
    : pose === 'walk'
    ? -10
    : 0;

  const legLeft = pose === 'walk' ? -20 : 0;
  const legRight = pose === 'walk' ? 20 : 0;

  return (
    <svg
      width="80"
      height="140"
      viewBox="0 0 80 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 머리 */}
      <circle cx="40" cy="20" r="16" stroke="white" strokeWidth="3.5" fill="none" />

      {/* 몸통 */}
      <line x1="40" y1="36" x2="40" y2="85" stroke="white" strokeWidth="3.5" strokeLinecap="round" />

      {/* 왼쪽 팔 (종이뭉치 쥐는 팔) */}
      {pose === 'hold' || pose === 'charge' || pose === 'throw' ? (
        <>
          {/* 오른팔 - 종이뭉치 쥠 */}
          <line
            x1="40" y1="55"
            x2={40 + Math.cos((armAngle * Math.PI) / 180) * 28}
            y2={55 + Math.sin((armAngle * Math.PI) / 180) * 28}
            stroke="white" strokeWidth="3.5" strokeLinecap="round"
          />
          {/* 왼팔 - 자연스럽게 */}
          <line x1="40" y1="55" x2="18" y2="75" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* 걷기 팔 */}
          <line x1="40" y1="55" x2="18" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="40" y1="55" x2="62" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}

      {/* 왼쪽 다리 */}
      <line
        x1="40" y1="85"
        x2={40 - 15 + legLeft}
        y2="125"
        stroke="white" strokeWidth="3.5" strokeLinecap="round"
      />
      {/* 오른쪽 다리 */}
      <line
        x1="40" y1="85"
        x2={40 + 15 + legRight}
        y2="125"
        stroke="white" strokeWidth="3.5" strokeLinecap="round"
      />

      {/* 발 */}
      <line
        x1={40 - 15 + legLeft} y1="125"
        x2={40 - 25 + legLeft} y2="130"
        stroke="white" strokeWidth="3" strokeLinecap="round"
      />
      <line
        x1={40 + 15 + legRight} y1="125"
        x2={40 + 25 + legRight} y2="130"
        stroke="white" strokeWidth="3" strokeLinecap="round"
      />

      {/* 던지기 포즈일 때 종이뭉치 */}
      {(pose === 'hold' || pose === 'charge') && (
        <circle
          cx={40 + Math.cos((armAngle * Math.PI) / 180) * 28 + Math.cos((armAngle * Math.PI) / 180) * 10}
          cy={55 + Math.sin((armAngle * Math.PI) / 180) * 28 + Math.sin((armAngle * Math.PI) / 180) * 10}
          r="10"
          fill="#f5f0e8"
          opacity="0.9"
        />
      )}
    </svg>
  );
};

export default Stickman;
