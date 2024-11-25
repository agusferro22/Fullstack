import { useState, useEffect } from "react";

function Users() {
    let [users, setUsers] = useState([]);
    let [formData, setFormData] = useState({ id: '', username: '', password: '' });
    let [method, setMethod] = useState("POST");

    const getUsers = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/users');
            const data = await resp.json();
            if (!data.data) {
                throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
            }
            setUsers(data.data.map(user => ({
                id: user._id,
                username: user.username,
                password: user.password,
            })));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = method === "DELETE" || method === "PUT" 
            ? `http://localhost:3000/api/users/${formData.id}`
            : `http://localhost:3000/api/users`;

        try {
            let response;
            if (method === "DELETE") {
                response = await fetch(url, {
                    method: "DELETE",
                });
            } else if (method === "PUT") {
                response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });
            } else if (method === "POST") {
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                await getUsers();
            } else {
                throw new Error("Error al enviar el formulario");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <>
            <ul role="list" className="divide-y divide-gray-200">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-lg mb-4 hover:bg-gray-100">
                        <div className="flex flex-col">
                            <div className="text-sm font-semibold text-gray-900">ID: {user.id}</div>
                            <div className="text-sm text-gray-700">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.password}</div>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        name="id" 
                        placeholder="ID del Usuario" 
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Nombre de Usuario" 
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="p-3 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-4 items-center">
                    <select 
                        onChange={(e) => setMethod(e.target.value)} 
                        value={method} 
                        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </>
    );
}

export default Users;
