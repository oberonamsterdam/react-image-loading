import * as React from 'react';

export interface FallbackProps {
    style?: React.CSSProperties;
}

const Fallback = (props: FallbackProps) => (
    <div
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: '#f3f3f3',
            ...(props.style)
        }}
    />
);

export default Fallback;