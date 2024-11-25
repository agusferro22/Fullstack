import { useState } from 'react';

const Registro = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Enviando formulario');
            console.log(formData);
            const endPoint = 'http://127.0.0.1:3000/api/users';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            };

            const response = await fetch(endPoint, config);

            if (!response.ok) {
                console.error(response);
            }

            const data = await response.json();

            console.log(data);
            setFormData({
                username: '',
                email: '',
                password: ''
            });

        } catch (error) {
            console.log(error);
            alert('Error del Servidor');
        }
    };

    return (
        <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 min-h-screen flex items-center justify-center">
            <div className="w-full sm:max-w-md bg-white rounded-lg shadow-lg p-6"> {/* Fondo blanco para el formulario */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Crea una cuenta
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Registrar mi cuenta
                    </button> {/* Cambio en el texto del botón */}
                </form>
                
                {/* Instrucciones para el usuario */}
                <div className="mt-6 text-sm text-gray-600">
                    <p className="text-center">Para crear una cuenta, simplemente ingresa tu nombre, correo electrónico y una contraseña segura. Una vez que envíes el formulario, tu cuenta será creada y podrás acceder a nuestras funciones.</p>
                    <p className="text-center mt-2">Si ya tienes una cuenta, <a href="/login" className="text-blue-600 hover:underline">inicia sesión aquí</a>.</p>
                </div>
            </div>
        </section>
    );
};

export default Registro;
