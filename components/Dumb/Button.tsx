import React from 'react';

// Define props for Button component
type ButtonProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
};

// Button component
const Button: React.FC<ButtonProps> = ({ onClick, label, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;
