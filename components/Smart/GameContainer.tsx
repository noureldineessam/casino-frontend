import React, { useState } from 'react';
import Slot from '../Dumb/Slot';
import Button from '../Dumb/Button';
import CashOutButton from '../Smart/CashOutButton';
import TransactionHistory from '../Smart/TransactionHistory';
import { apiClient } from '../../pages/api/apiClient';
import { User } from '../../types/types';


type GameContainerProps = {
    user: User;
    setUser: Function;
};

const endMessages = [
    'That’s all, folks! 🌟',
    'Game over, man! GAME OVER! 😱',
    'You’ve cashed out! Time to celebrate... or cry! 🍾😂',
    'All done! Go treat yourself to something nice! 🍦',
    'You’ve left the game! Now go conquer the world! 🌍',
    'That’s a wrap! See you next time, champ! 🏆',
    'Game over, dude! You’ll get ‘em next time! 🕹️',
    'You’ve cashed out! Now go tell everyone about it! 📢',
    'Hasta la vista, baby! 👋',
    'You’ve reached the end! Time to relax and unwind! 🛋️',
    'Finito! Time to take a break! ☕',
    'You’re outta here! See you on the flip side! 🌀',
];

const tryAgainMessages = [
    'So close! Give it another shot! 🚀',
    'Almost there! Try your luck again! 🍀',
    'You’ve got this! Spin it to win it! 🎰',
    'One more go! Show that machine who’s boss! 💪',
    'Don’t give up! Your luck is just around the corner! 🔄',
    'Keep going! Big win ahead! 🎉',
    'Just a bit more! Spin for the win! 🌟',
    'You’re on a roll! Don’t stop now! 🏃‍♂️',
    'Another spin, another chance! Let’s go! 🎲',
    'You’ve got the power! Spin it again! ⚡',
    'Almost hit the jackpot! Try again! 💰',
    'Keep spinning! Fortune favors the brave! 🏆',
    'Give it another whirl! Your win is waiting! 🎡',
    'One more spin! Make it count! 💥',
    'Spin and win! Your big break is near! 🎇',
];

const mapToEmoji = (value: string): string => {
    const emojiMap: { [key: string]: string } = { 'C': '🍒', 'L': '🍋', 'O': '🍊', 'W': '🍉' };
    return emojiMap[value] || '❓';
};

const GameContainer: React.FC<GameContainerProps> = ({ user, setUser }) => {
    const [slots, setSlots] = useState<string[]>(['🍒', '🍒', '🍒']);
    const [credits, setCredits] = useState<number>(user.balance);
    const [spinning, setSpinning] = useState<boolean>(false);


    const randomSlotValue = (): string => {
        const slotValues = ['🍒', '🍋', '🍊', '🍉'];
        return slotValues[Math.floor(Math.random() * slotValues.length)];
    };

    const spinSlots = async (): Promise<void> => {
        setSpinning(true);
        const spinDuration = 1000;
        const spinInterval = 100;

        // Start spinning effect
        const spinEffects = Array(3).fill(null).map((_, index) =>
            setInterval(() => {
                setSlots((prevSlots) => {
                    const newSlots = [...prevSlots];
                    newSlots[index] = randomSlotValue();
                    return newSlots;
                });
            }, spinInterval)
        );

        try {
            const response = await apiClient.roll(user.id);
            const newSlots = response.rollResult.map(mapToEmoji);

            // Stop the spinning effect with a delay between each slot
            for (let i = 0; i < spinEffects.length; i++) {
                setTimeout(() => {
                    clearInterval(spinEffects[i]);
                    setSlots((prevSlots) => {
                        const updatedSlots = [...prevSlots];
                        updatedSlots[i] = newSlots[i];
                        return updatedSlots;
                    });
                    if (i === spinEffects.length - 1) {
                        setSpinning(false);
                        //wait until animation ends to show the result
                        setTimeout(() => {
                            if (response.rollResult.every((slot, index) => slot === response.rollResult[0])) {
                                alert('You Won! 🎉');
                            } else if (credits > response.userAfterRoll.balance) {
                                if (response.userAfterRoll.balance === 0) {
                                    const endMessage = endMessages[Math.floor(Math.random() * endMessages.length)];
                                    alert(endMessage);
                                    setUser(null);
                                    return;
                                }
                                const tryAgainMessage = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
                                alert(tryAgainMessage);
                            }
                            setCredits(response.userAfterRoll.balance);
                        }, spinInterval);

                    }
                }, spinDuration * (i + 1));
            }
        } catch (error) {
            console.error('Error spinning slots:', error);
            spinEffects.forEach(clearInterval);
            setSpinning(false);
        }
    };

    const cashout = async (): Promise<void> => {
        try {
            await apiClient.cashout(user.id);
            const endMessage = endMessages[Math.floor(Math.random() * endMessages.length)];
            alert(endMessage);
            setCredits(0);
            setUser(null);
        } catch (error) {
            console.error('Error cashing out:', error);
        }
    };

    return (
        <div className="game-container">
            <h2>Welcome {user.name}, to the The Slot Machine</h2>
            <h4>Every attmept uses 1 credit</h4>
            <h4>But, it's easy. Just match 3 to win!</h4>
            <h4>Be careful, the Cash Out button is alive...</h4>

            <div className={"legend"}>
                <ul>
                    <li>🍒🍒🍒: $10</li>
                    <li>🍋🍋🍋: $20</li>
                    <li>🍊🍊🍊: $30</li>
                    <li>🍉🍉🍉: $40</li>
                </ul>
            </div>
            <div className="slots">
                {slots.map((slot, index) => <Slot key={index} value={slot} />)}
            </div>

            <Button onClick={spinSlots} label="Roll" disabled={spinning || credits <= 0} />
            <div className="credits">Credits: {credits}</div>


            {/* when credits are 0, the button is disabled */}
            {/* when the slots are spinning (spinning:true), the button is disabled */}

            <CashOutButton onCashOut={cashout} canCashOut={credits === 0 ? false : !spinning} />

            <TransactionHistory userId={user.id} spinning={spinning} />


        </div>
    );
};

export default GameContainer;
