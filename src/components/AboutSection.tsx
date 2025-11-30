const AboutSection = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform md:rotate-3 transition-transform hover:rotate-0 duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                                alt="Chef preparing seafood"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-[var(--color-primary)]/10 rounded-lg -z-0"></div>
                        <div className="absolute -top-6 -left-6 w-2/3 h-2/3 border-4 border-[var(--color-primary)]/20 rounded-lg -z-0"></div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-[var(--color-primary)] font-bold tracking-widest uppercase mb-4 text-sm">
                            Nuestra Historia
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                            Pasión por el <br />
                            <span className="text-[var(--color-primary)]">Sabor Marino</span>
                        </h2>
                        <p className="text-[var(--color-text-light)] text-lg mb-6 leading-relaxed">
                            En 200 Millas, nos dedicamos a traer lo mejor del mar peruano a tu mesa.
                            Cada plato es una obra de arte culinaria, preparada con ingredientes frescos
                            y una pasión inigualable por la gastronomía.
                        </p>
                        <p className="text-[var(--color-text-light)] text-lg mb-8 leading-relaxed">
                            Desde nuestros ceviches clásicos hasta nuestras innovadoras creaciones,
                            te invitamos a vivir una experiencia única que despertará todos tus sentidos.
                        </p>

                        <div className="flex gap-8 border-t border-gray-100 pt-8">
                            <div>
                                <span className="block text-4xl font-bold text-[var(--color-primary)] mb-1">15+</span>
                                <span className="text-sm text-gray-500 uppercase tracking-wide">Años de Experiencia</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold text-[var(--color-primary)] mb-1">3</span>
                                <span className="text-sm text-gray-500 uppercase tracking-wide">Locales en Lima</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;