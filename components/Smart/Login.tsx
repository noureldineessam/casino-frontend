import React, { useState } from 'react';

// Define props for Login component
type LoginProps = {
    onLogin: (name: string, account: string) => void;
};

// Login component
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');


    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(name, account);
    };

    return (
        <form onSubmit={handleSubmit} className='form-container flex-direction-column'>
            <h2>Enter your name and bank account to start playing</h2>
            <div className='login-form-inputs'>
                <div className='flex-direction-column'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <input
                        type="text"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="Enter your bank account nuumber"
                        required
                    />
                </div>
                <div>
                    <button type="submit">Start Session</button>
                </div>
            </div>
        </form>
    );
};

export default Login;
