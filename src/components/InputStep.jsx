import React, { useState, useRef } from 'react';
import styles from './InputStep.module.css';

const InputStep = ({ onDone }) => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, trimmed]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <p className={styles.emoji}>😤</p>
        <h1 className={styles.title}>오늘 스트레스<br />받는 일 있었어?</h1>
        <p className={styles.sub}>다 적어봐. 들어줄게.</p>
      </div>

      {/* 종이 영역 */}
      <div className={styles.paper}>
        {items.length === 0 && (
          <p className={styles.paperEmpty}>여기에 쌓일 거야...</p>
        )}
        <ul className={styles.itemList}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.bullet}>✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 입력 영역 */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="뭐가 그렇게 스트레스야..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.addBtn} onClick={handleAdd}>+</button>
        </div>

        <button
          className={styles.doneBtn}
          onClick={() => items.length > 0 && onDone(items)}
          disabled={items.length === 0}
        >
          다 적었어! 날려버리자 🔥
        </button>
      </div>
    </div>
  );
};

export default InputStep;
