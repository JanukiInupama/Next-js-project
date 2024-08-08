import React, { useState, useEffect } from 'react';
import Card from './Card';

type CardProps = {
    imageSrc: string;
    altText: string;
};

type ResponsiveCardLayoutProps = {
    cards: CardProps[];
};

const ResponsiveCardLayout: React.FC<ResponsiveCardLayoutProps> = ({ cards }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    if (isMobile) {
        return (
            <div className="relative w-full overflow-hidden">
                <div 
                    className="flex transition-transform duration-300 ease-in-out" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {cards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <Card ImageSrc={card.imageSrc} altText={card.altText} />
                        </div>
                    ))}
                </div>
                <button 
                    onClick={prevSlide} 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                    &lt;
                </button>
                <button 
                    onClick={nextSlide} 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                    &gt;
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center">
            {cards.map((card, index) => (
                <Card key={index} ImageSrc={card.imageSrc} altText={card.altText} />
            ))}
        </div>
    );
};

export default ResponsiveCardLayout;