import Header from '@components/Header';
import Hero from '@components/Hero';
import AboutSection from '@components/AboutSection';
import LocationsSection from '@components/LocationsSection';
import Footer from '@components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow">
                <Hero />
                <AboutSection />
                <LocationsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;