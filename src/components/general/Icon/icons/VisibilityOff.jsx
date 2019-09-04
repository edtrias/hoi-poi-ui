import React from 'react';

function VisibilityOff({ color, ...props }) {
    return (
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path d="M0 0h10v10H0V0zm0 0h10v10H0V0zm0 0h10v10H0V0zm0 0h10v10H0V0z" />
                <path
                    d="M5.002 2.645c1.255 0 2.274 1.06 2.274 2.368 0 .308-.06.597-.164.867L8.44 7.263A5.595 5.595 0 0 0 10 5.013c-.787-2.08-2.729-3.552-5.002-3.552-.637 0-1.246.118-1.81.331l.982 1.023c.26-.109.537-.17.832-.17zM.455 1.352l1.037 1.08.209.217A5.577 5.577 0 0 0 0 5.013c.787 2.08 2.729 3.553 5.002 3.553.705 0 1.378-.142 1.992-.398l.191.199L8.518 9.75l.577-.602L1.032.75l-.577.602zm2.515 2.62l.704.733a1.39 1.39 0 0 0-.036.308c0 .786.61 1.421 1.364 1.421.1 0 .2-.014.296-.038l.705.735a2.181 2.181 0 0 1-1 .25c-1.256 0-2.274-1.06-2.274-2.368 0-.374.09-.725.24-1.042zm1.96-.37l1.432 1.492.01-.076c0-.786-.61-1.421-1.365-1.421l-.077.005z"
                    fill={color}
                />
            </g>
        </svg>
    );
}

export default React.memo(VisibilityOff);
