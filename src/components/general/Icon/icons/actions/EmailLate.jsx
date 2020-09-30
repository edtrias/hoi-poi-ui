import React from 'react';

function EmailLate({ color = '#788590', ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M17.994 10A6.003 6.003 0 0124 16c0 3.312-2.688 6-6.006 6A5.997 5.997 0 0112 16c0-3.312 2.682-6 5.994-6zM18 11.2a4.799 4.799 0 00-4.8 4.8c0 2.652 2.148 4.8 4.8 4.8 2.652 0 4.8-2.148 4.8-4.8 0-2.652-2.148-4.8-4.8-4.8zM20 4c1.05 0 1.918.82 1.994 1.851L22 6l.001 3.07a7.948 7.948 0 00-2.292-.887L20 8V6l-3.394 2.121a7.993 7.993 0 00-4.768 2.777L4 6v2l6.9 4.312A7.966 7.966 0 0010 16c0 1.458.39 2.824 1.07 4.001L4 20c-1.05 0-1.918-.82-1.994-1.851L2 18l.01-12c0-1.05.81-1.918 1.841-1.994L4 4h16zm-2 8v4.016l3 2.043-.5.941-3.5-2.41V12h1z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default EmailLate;
