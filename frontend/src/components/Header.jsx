import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
    let [logeado, setLogeado] = useState(false);

    return (
        <header className="bg-gray-900 text-white py-6">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center space-y-4">
                <h1 className="text-4xl font-serif font-semibold">Parcial 2 - React</h1>
                
        
                {/* Barra de navegación con los botones */}
                <div className="flex justify-center gap-8 mt-4">
                    <NavLink to='/' className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">Inicio</NavLink>
                    <NavLink to='/registro' className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300">Registro</NavLink>
                    <NavLink to='/login' className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700 transition duration-300">Iniciar sesión</NavLink>
                    <NavLink to='/crud' className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300">Crud</NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;
