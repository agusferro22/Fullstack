import { useState, useEffect } from "react";

function Comments() {
    let [comments, setComments] = useState([]);
    let [formData, setFormData] = useState({ id: '', body: '', likes: '', userId: '', postId: '' });
    let [method, setMethod] = useState("POST");

    const getComments = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/comments');
            const data = await resp.json();
            if (!data.data) {
                throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
            }
            setComments(data.data.map(comment => ({
                id: comment._id,
                body: comment.body,
                likes: comment.likes,
                username: comment.user.username,
                userId: comment.user._id,
                postId: comment.postId
            })));
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const url = method === "DELETE" || method === "PUT" 
            ? `http://localhost:3000/api/comments/${formData.id}`
            : `http://localhost:3000/api/comments`;
    
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
                        body: formData.body,
                        likes: formData.likes,
                        postId: formData.postId,
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
                await getComments();
            } else {
                throw new Error("Error al enviar el formulario");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };
    

    return (
        <>
            <h2 className="text-3xl font-bold mt-6 mb-4 text-center text-gray-800">Comentarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((comment) => (
                    <li key={comment.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-gray-900">Usuario: {comment.username}</p>
                                <span className="text-sm text-gray-600">ID: {comment.userId}</span>
                            </div>
                            <p className="text-base text-gray-700 mt-2">{comment.body}</p>
                            <p className="text-sm text-gray-600">Likes: {comment.likes}</p>
                        </div>
                    </li>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md max-w-xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nuevo Comentario</h3>

                <input 
                    type="text" 
                    name="id" 
                    placeholder="ID del Comentario" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    name="body" 
                    placeholder="Comentario" 
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="number" 
                    name="likes" 
                    placeholder="Likes" 
                    value={formData.likes}
                    onChange={(e) => setFormData({...formData, likes: e.target.value})}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    name="userId" 
                    placeholder="ID Usuario" 
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    name="postId" 
                    placeholder="ID Post" 
                    value={formData.postId}
                    onChange={(e) => setFormData({...formData, postId: e.target.value})}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-4 mb-4">
                    <select 
                        onChange={(e) => setMethod(e.target.value)} 
                        value={method} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Enviar
                </button>
            </form>
        </>
    );
}

export default Comments;
