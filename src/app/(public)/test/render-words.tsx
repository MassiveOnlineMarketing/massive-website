import React from 'react';
// import './TypingAnimation.css';

const TypingAnimation = ({ text }: { text: string }) => {
    return (
        <span className="typing">
            {text.split('').map((char, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                    {char}
                </span>
            ))}
            {/* <span className="blinking-cursor" style={{ animationDelay: `${text.length * 0.2}s` }}>|</span> */}
        </span>
    );
};

export default TypingAnimation;