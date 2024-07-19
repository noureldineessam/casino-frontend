# 🎰 Awesome Casino Frontend

Welcome to the most thrilling, fun, and absolutely addictive Slot Machine Game! Get ready to spin those reels, win big, and maybe even run into a few surprises along the way. 🍒🍋🍊🍉

## 🚀 Getting Started

Before diving into the fun, let's get everything set up.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Install the dependencies:

```bash
npm install
```

### Running the Game

Fire up the server and the frontend:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to start playing!

## 🎮 How to Play

1. **Login**: Enter your name and bank account to get started.
2. **Spin the Reels**: Hit the "Roll" button to spin the slots.
3. **Match 3 to Win**: Match three symbols to win credits.
4. **Cash Out**: Click the "CASH OUT" button to collect your winnings—but watch out, it might move!

### Game Components

- **Login Component**: Enter your credentials to join the game.
- **Game Container**: The main hub where all the slot action happens.
- **Slot Component**: Displays the spinning slot symbols.
- **Button Component**: Handles the spin and cash-out actions.
- **Transaction History**: Keep track of your spins and winnings.

## 🛠️ API Endpoints

### `/users`

- **POST**: Start a new game session.

### `/game/roll`

- **POST**: Spin the slot machine.

### `/users/cashout`

- **PUT**: Cash out your credits.

### `/users/history/:userId`

- **GET**: Retrieve the transaction history.

## 📦 File Structure

```
slot-machine-game/
├── components/
│   ├── Dumb/
│   │   ├── Button.tsx
│   │   ├── Slot.tsx
│   ├── Smart/
│   │   ├── CashOutButton.tsx
│   │   ├── GameContainer.tsx
│   │   ├── Login.tsx
│   │   ├── TransactionHistory.tsx
├── pages/
│   ├── api/
│   │   ├── apiClient.ts
│   ├── index.tsx
├── styles/
│   ├── styles.css
├── types/
│   ├── types.ts
├── README.md
├── package.json
```

## 🌟 Features

- **Engaging Gameplay**: Fun animations and effects to keep you entertained.
- **Playful Cash Out Button**: Watch out for the mischievous cash-out button!
- **Transaction History**: Keep track of your wins and spins.

