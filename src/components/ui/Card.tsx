import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

export default function Card({ children, className = '', hoverEffect = false, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`card-glass p-6 ${hoverEffect ? 'hover:border-accent-yellow/30 hover:shadow-[0_0_20px_rgba(242,187,47,0.1)] transition-all duration-300 cursor-pointer' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
