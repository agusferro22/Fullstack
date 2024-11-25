function Card({ method, endpoint, description }) {
    const colors = {
        REGISTER: {
            bg: "bg-teal-50",         // Color para registro de usuarios
            labelBg: "bg-teal-700",
        },
        EDIT: {
            bg: "bg-indigo-50",       // Color para editar usuarios
            labelBg: "bg-indigo-700",
        },
        DELETE: {
            bg: "bg-red-50",          // Color para eliminar usuario
            labelBg: "bg-red-700",
        },
        VIEW: {
            bg: "bg-yellow-50",       // Color para ver detalles del usuario
            labelBg: "bg-yellow-700",
        },
    };

    const color = colors[method] || {
        bg: "bg-gray-50",            // Color por defecto
        labelBg: "bg-gray-700",
    };

    return (
        <div className={`border p-2 ${color.bg}`}>
            <div className="flex items-center gap-1">
                <div className={`text-sm text-white font-semibold px-2 rounded-full w-fit ${color.labelBg}`}>
                    {method || "UNKNOWN"}
                </div>
                <p className="font-medium">{endpoint || "No endpoint provided"}</p>
            </div>
            <p>{description || "No description available"}</p>
        </div>
    );
}

export default Card;
