const Footer = () => {
    return (
        <footer className="bg-[var(--color-primary)] text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">200 MILLAS</h2>
                        <p className="text-gray-400 text-sm max-w-xs">
                            La mejor experiencia gastronómica marina en Lima. Tradición, sabor y frescura en cada plato.
                        </p>
                    </div>

                    <div className="flex space-x-6 mb-8 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h.08zm-1.8 1.8c-2.67 0-2.975.01-4.022.058-.973.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.884-.344 1.857-.047 1.023-.058 1.351-.058 4.022 0 2.67.01 2.975.058 4.022.045.973.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.884.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.975-.01 4.022-.058.973-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.884.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.975-.058-4.022-.045-.973-.207-1.504-.344-1.857-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.884-.3-1.857-.344-1.023-.047-1.351-.058-4.022-.058zm3.6 3.6a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8zm0 1.6a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm5.2-3.6a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} 200 Millas. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;