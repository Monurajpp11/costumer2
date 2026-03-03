import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div className="w-full">
            <Hero />
            <Services />
            <Testimonials />
        </div>
    );
};

export default Home;
