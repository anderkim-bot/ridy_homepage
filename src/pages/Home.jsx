import React from 'react';
import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';
import AppCta from '../components/AppCta'; // I should extract the App CTA section to its own component

const Home = () => {
    return (
        <>
            <Hero />
            <HomeContent />
            <AppCta />
        </>
    );
};

export default Home;
