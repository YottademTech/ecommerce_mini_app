import React from 'react';

const Shimmer: React.FC<{ active?: boolean }> = ({ active = false }) => (
    active ? (
        <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <span className="shimmer block w-full h-full" />
        </span>
    ) : null
);

export default Shimmer; 