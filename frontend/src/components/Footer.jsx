function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-6">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-serif font-semibold mb-2">Materia</h3>
                    <p className="text-lg">Aplicaciones Híbridas</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-serif font-semibold mb-2">Profesor</h3>
                    <p className="text-lg">Jonathan Cruz</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-serif font-semibold mb-2">Comisión</h3>
                    <p className="text-lg">DWM4AP</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <p className="text-sm opacity-75">© 2024 - Todos los derechos reservados</p>
            </div>
        </footer>
    );
}

export default Footer;
