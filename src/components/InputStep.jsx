import React, { useState, useRef, useEffect } from 'react';
import styles from './InputStep.module.css';
import checkImg from '../assets/check.png';

const InputStep = ({ onDone }) => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

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

  // 항목 추가될 때 스크롤 맨 아래로
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [items]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>스트레스 받은거<br />여기 다적어봐</h1>
      
      <div className={styles.notebookArea}>
        <div className={styles.listContainer} ref={listRef}>
          {items.map((item, i) => (
            <div key={i} className={styles.listItem}>
              <img src={checkImg} alt="check" className={styles.checkIcon} />
              <span className={styles.itemText}>{item}</span>
            </div>
          ))}
          {/* 입력 중이 아닐 때도 빈 줄을 보여주기 위한 처리 */}
          {items.length < 8 && Array.from({ length: 8 - items.length }).map((_, i) => (
             <div key={`empty-${i}`} className={styles.emptyLine}></div>
          ))}
        </div>
      </div>

      <div className={styles.inputWrap}>
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="뭐가 그렇게 스트레스였어.."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.addBtn} onClick={handleAdd}>+</button>
        </div>
        
        <button
          className={`${styles.doneBtn} ${items.length > 0 ? styles.active : ''}`}
          onClick={() => items.length > 0 && onDone(items)}
          disabled={items.length === 0}
        >
          다적었어! 이제 꾸겨서 날려버리자
        </button>
      </div>
    </div>
  );
};

export default InputStep;
