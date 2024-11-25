import Column from '../components/Column'
import Card from '../components/Card'

function Home() {
    const data = {
        users: [
            { method: "POST", endpoint: "/api/users/login", description: "Inicia sesión con un usuario" },
            { method: "PUT", endpoint: "/api/users/:id", description: "Actualiza un usuario por ID" },
            { method: "GET", endpoint: "/api/users", description: "Obtiene todos los usuarios" },
            { method: "DELETE", endpoint: "/api/users/:id", description: "Elimina un usuario por ID" },
            { method: "GET", endpoint: "/api/users/:id", description: "Obtiene un usuario por ID" },
        ],
        posts: [
            { method: "POST", endpoint: "/api/posts", description: "Crea un nuevo posteo" },
            { method: "GET", endpoint: "/api/posts", description: "Obtiene todos los posteos" },
            { method: "GET", endpoint: "/api/posts?sort=top", description: "Obtiene todos los posteos ordenados de mayor a menor likes" },
            { method: "GET", endpoint: "/api/posts?sort=views", description: "Obtiene todos los posteos ordenados de mayor a menor vistas" },
            { method: "GET", endpoint: "/api/posts/user/:userId", description: "Obtiene un posteo de un usuario por su ID" },
        ],
        comments: [
            { method: "DELETE", endpoint: "/api/comments/:id", description: "Elimina un comentario por ID" },
            { method: "POST", endpoint: "/api/comments", description: "Crea un nuevo comentario" },
            { method: "PUT", endpoint: "/api/comments/:id", description: "Actualiza un comentario por ID" },
            { method: "GET", endpoint: "/api/comments", description: "Obtiene todos los comentarios" },
            { method: "GET", endpoint: "/api/comments/user/:userId", description: "Obtiene todos los comentarios de un usuario" },
        ],
    };

    return (
        <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 min-h-screen py-12 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column for Users */}
            <Column id="user" label="Usuarios">
                <h2 className="sr-only">Usuarios</h2>
                {data.users.map((user, index) => (
                    <Card key={index} method={user.method} endpoint={user.endpoint} description={user.description} />
                ))}
            </Column>

            {/* Column for Posts */}
            <Column id="post" label="Posteos">
                <h2 className="sr-only">Posteos</h2>
                {data.posts.map((post, index) => (
                    <Card key={index} method={post.method} endpoint={post.endpoint} description={post.description} />
                ))}
            </Column>

            {/* Column for Comments */}
            <Column id="comment" label="Comentarios">
                <h2 className="sr-only">Comentarios</h2>
                {data.comments.map((comment, index) => (
                    <Card key={index} method={comment.method} endpoint={comment.endpoint} description={comment.description} />
                ))}
            </Column>
        </section>
    )
}

export default Home;
