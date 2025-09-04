// resources/js/Components/WavingHand.tsx

import React from 'react';

const WavingHand = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="64"
        height="64"
        style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '12px' }}
    >
        <style>
            {`
                @keyframes wave-animation {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }
                .wave {
                    animation: wave-animation 2.5s infinite;
                    transform-origin: 70% 70%;
                    display: inline-block;
                }
            `}
        </style>
        <g className="wave">
            <path fill="#FFDDA3" d="M109.2 87.3c-3.3-3.3-6.6-6.6-9.9-9.9-2.2-2.2-4.4-4.4-6.6-6.6-4.5-4.5-9.1-9.1-13.6-13.6-2.8-2.8-5.6-5.6-8.4-8.4-1.2-1.2-2.4-2.5-3.6-3.7-1.3-1.3-2.6-2.6-3.9-3.9-5-5-10-10.1-15.1-15.1-1.3-1.3-2.5-2.6-3.8-3.9-1.3-1.3-2.6-2.5-3.9-3.8C30.6 8.6 19.3 2.9 14 3.7c-5.3.8-9.9 5.4-10.7 10.7-.8 5.3 4.9 16.6 12.8 26.5l3.8 3.8c5 5 10.1 10 15.1 15.1l3.9 3.9c1.3 1.3 2.6 2.5 3.9 3.8 1.3 1.3 2.6 2.6 3.8 3.9 2.8 2.8 5.6 5.6 8.4 8.4 4.5 4.5 9.1 9.1 13.6 13.6 2.2 2.2 4.4 4.4 6.6 6.6 3.3 3.3 6.6 6.6 9.9 9.9 3.5 3.5 7.6 5.6 12.1 5.6s8.6-2.1 12.1-5.6c6.8-6.8 6.8-17.5 0-24.3z" />
        </g>
    </svg>
);

export default WavingHand;