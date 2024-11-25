import { useState } from 'react';
import { Link } from 'react-router-dom';  // Importa Link

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endPoint = 'http://127.0.0.1:5000/api/users/login';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            };

            const response = await fetch(endPoint, config);

            if (!response.ok) {
                console.error('Login failed');
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('authToken', data.token); 
                setIsAuthenticated(true);
            }

            setFormData({
                username: '',
                password: ''
            });
        } catch (error) {
            console.error('Error al intentar loguear', error);
        }
    };

    return (
        <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full sm:max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Iniciar sesión
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                            Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Ingrese su usuario"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Ingrese su contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div className="mt-4 text-sm text-gray-300 text-center">
                    <p>¿No tienes una cuenta? 
                        <Link to="/register" className="text-blue-400 hover:underline"> Regístrate aquí</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
