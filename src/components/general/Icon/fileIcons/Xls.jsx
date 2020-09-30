import React from 'react';

function Xls({ ...props }) {
    return (
        <svg viewBox="0 0 18 18" {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M10.582 2.672v12.656h6.28a.564.564 0 00.576-.55V3.226a.565.565 0 00-.576-.554h-6.28z"
                    fill="#227547"
                />
                <path
                    fill="#FFF"
                    d="M10.582 4.253h2.156v1.582h-2.155zM10.582 6.89h2.156v1.583h-2.155zM10.582 9.527h2.156v1.583h-2.155zM10.582 12.165h2.156v1.582h-2.155zM13.746 12.165h2.11v1.582h-2.11zM13.746 9.527h2.11v1.583h-2.11zM13.746 6.89h2.11v1.583h-2.11zM13.746 4.253h2.11v1.582h-2.11z"
                />
                <path fill="#227547" d="M.563 2.439V15.56l9.492 1.877V.563z" />
                <path
                    fill="#FFF"
                    d="M5.195 7.91l1.409-2.42h1.344L5.923 8.813l2.07 3.378H6.637l-1.44-2.458-1.446 2.458H2.397l2.076-3.378-2.03-3.323h1.344z"
                />
            </g>
        </svg>
    );
}

export default React.memo(Xls);
