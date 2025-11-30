const LocationsSection = () => {
    const locations = [
        {
            id: 1,
            name: "San Isidro",
            address: "Av. Conquistadores 1234",
            phone: "(01) 444-5555",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        },
        {
            id: 2,
            name: "Miraflores",
            address: "Calle Berlin 456",
            phone: "(01) 444-6666",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        },
        {
            id: 3,
            name: "La Molina",
            address: "Av. Raul Ferrero 789",
            phone: "(01) 444-7777",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        }
    ];

    return (
        <section id="locales" className="py-20 bg-[var(--color-secondary)] text-[var(--color-text)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-[var(--color-primary)] text-sm font-bold tracking-widest uppercase mb-2">
                            Visítanos
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold">
                            Nuestros Locales
                        </h3>
                    </div>
                    <p className="text-[var(--color-text-light)] max-w-md text-right md:text-left">
                        Encuentra el restaurante 200 Millas más cercano y disfruta de la mejor experiencia marina.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {locations.map((location) => (
                        <div key={location.id} className="bg-[var(--color-surface)] p-8 border border-gray-200 hover:border-[var(--color-primary)] transition-colors duration-300 group shadow-sm hover:shadow-md">
                            <h4 className="text-xl font-bold text-[var(--color-text)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                {location.name}
                            </h4>
                            <div className="space-y-3 text-[var(--color-text-light)] text-sm">
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {location.address}
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {location.phone}
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {location.hours}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationsSection;