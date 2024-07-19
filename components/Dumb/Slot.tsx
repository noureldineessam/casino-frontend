import React from 'react';

// Define props for Slot component
type SlotProps = {
    value: string;
};

// Slot component
const Slot: React.FC<SlotProps> = ({ value }) => {
    return <div className="slot">{value}</div>;
};

export default Slot;
