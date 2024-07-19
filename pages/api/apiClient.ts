// Define types for API responses

import { RollApiResponse, Transaction } from '../../types/types';

const BASE_URL = 'http://localhost:4000/api';

// API client for interacting with the backend
export const apiClient = {
  start: async (name: string, bankAccount: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, bankAccount }),
    });
    return await response.json();
  },

  roll: async (userId: string): Promise<RollApiResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/game/roll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Error:', error.message);
      throw error;
    }
  },

  cashout: async (userId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/cashout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },

  getHistory: async (userId: string): Promise<Transaction[]> => {
    const response = await fetch(`${BASE_URL}/users/history/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();

  },
};
