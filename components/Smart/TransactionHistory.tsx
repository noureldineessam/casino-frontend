// components/Smart/TransactionHistory.tsx

import React, { useEffect, useState } from 'react';
import { apiClient } from '../../pages/api/apiClient';
import { Transaction } from '../../types/types';




type TransactionHistoryProps = {
    userId: string;
    spinning: boolean;
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userId, spinning }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data: Transaction[] = await apiClient.getHistory(userId);
                setTransactions(data);
            } catch (error) {
                setError('Failed to fetch transaction history.');
                console.error('Error fetching transaction history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [spinning]);

    if (loading) return <p>Loading history...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={'transaction-history'}>
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={transaction.id}>
                        {index + 1}. {new Date(transaction.timestamp).toLocaleString()}: {transaction.transactionType} ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
