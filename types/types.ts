export type User = {
    id: string;
    name: string;
    balance: number;
};

export type RollApiResponse = {
    rollResult: Array<string>;
    userAfterRoll: User;
};

export type Transaction = {
    id: string;
    amount: number;
    transactionType: string;
    timestamp: string;
};
