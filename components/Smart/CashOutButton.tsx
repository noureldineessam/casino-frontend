import React, { use, useState, useEffect } from 'react';
import Button from '../Dumb/Button';

type CashOutButtonProps = {
  onCashOut: () => void;
  canCashOut: boolean;
};

const tryAgainMessages = [
  'Nice try! Better luck next time! 🕺',
  'Whoops! Almost got it! 😂',
  'Close, but no cigar! 🚬',
  'Try again! You can do it! 💪',
  'So close! Don’t give up! 💫',
  'Missed it by that much! 😂',
  'Almost had it! One more try! 💪',
  'Oops! Try again! 🍀',
  'Nearly there! Don’t stop! 🚀',
];

const disabledMessages = [
  'Not this time! You’ll have to spin again! 🔄',
  'Button is disabled! Give it another spin! 🎰',
  'Try again! The button is locked! 🔒',
  'Bad luck! You need to spin once more! 🍀',
  'No cash out now! Spin the slots again! 🎰',
  'Locked out! Spin again to try cash out! 🔄',
  'Spin again! Better luck next time! 🍀',
  'Cash out locked! Give it another spin! 🎰',
  'Spin the slots to unlock the cash out! 🔒',
  'Try again! The button won’t work this time! 🚫',
];

const CashOutButton: React.FC<CashOutButtonProps> = ({ onCashOut, canCashOut }) => {
  const [position, setPosition] = useState({ top: '90%', right: '50%' });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (canCashOut) {
      setDisabled(false);
    }
  }, [canCashOut]);

  const handleMouseEnter = () => {
    let tryAgainMessage = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
    const randomChance = Math.random();
    // Independent random events
    // 40% chance to make the button unclickable
    if (randomChance < 0.4) {
      setDisabled(true);
      tryAgainMessage = disabledMessages[Math.floor(Math.random() * disabledMessages.length)];
    }
    // 50% chance to move the button
    if (randomChance < 0.5) {
      const angle = Math.random() * 2 * Math.PI;

      // Calculate x and y offsets based on the angle and 300px distance
      // Math.sqrt(offsetX**2 + offsetY**2) ≈ 300 (distance from the center)
      const offsetX = 300 * Math.cos(angle);
      const offsetY = 300 * Math.sin(angle);
      console.log(`offsetX: ${offsetX}px, offsetY: ${offsetY}px`);

      setPosition({
        top: `calc(50% + ${offsetX}px)`,
        right: `calc(50% + ${offsetY}px)`,
      });
      setTimeout(() => {
        alert(tryAgainMessage);
      }, 500);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        right: position.right,
        transition: 'all 0.3s ease',
        transform: 'translateX(50%)'
      }}
      onMouseEnter={handleMouseEnter}
    >
      <Button onClick={onCashOut} label="CASH OUT" disabled={canCashOut ? disabled : true} />
    </div>
  );
};

export default CashOutButton;
