const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1534483509522-366963e5a44d?q=80&w=2069&auto=format&fit=crop"
                    alt="Seafood background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h2 className="text-white text-lg md:text-xl tracking-[0.3em] uppercase mb-6 animate-fade-in-up font-bold inline-block px-6 py-2 border border-white/30 backdrop-blur-sm rounded-sm">
                    Bienvenidos a
                </h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
                    200 MILLAS
                </h1>
                <p className="text-gray-100 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light drop-shadow-md leading-relaxed">
                    La mejor experiencia gastronómica marina. <br className="hidden md:block" />
                    <span className="font-semibold text-white">Tradición y sabor en cada plato.</span>
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <a
                        href="/menu"
                        className="px-10 py-4 bg-primary text-white hover:bg-primary-hover transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Ver Carta
                    </a>
                    <a
                        href="#locales"
                        className="px-10 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Visítanos
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;