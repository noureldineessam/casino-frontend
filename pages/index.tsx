import React, { useEffect, useState } from 'react';
import GameContainer from '../components/Smart/GameContainer';
import Login from '../components/Smart/Login';
import { apiClient } from '../pages/api/apiClient';
import Head from 'next/head'; // Import Head component

// Define the User type
type User = {
  id: string;
  name: string;
  balance: number;
};

// Home component
const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle user login
  const handleLogin = async (name: string, bankAccount: string) => {
    try {
      const response = await apiClient.start(name, bankAccount);
      if (response) {
        setUser(response);
        setError(null); // Clear any previous errors
      } else {
        setError('The game is having a break, you should too!'); // Handle case where user is null
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('The game is having a break, you should too!');
    }
  };


  return (
    <div>
      <Head>
        <title>Slot Machine Game</title>
      </Head>
      {user ? (
        <GameContainer user={user} setUser={setUser} />
      ) : (
        <div className="login-container flex-direction-column">
          <Login onLogin={handleLogin} />
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
