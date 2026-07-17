function PriorityBadge({ priority }) {
    const styles = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-orange-100 text-orange-700",
        Low: "bg-green-100 text-green-700",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
                styles[priority] || "bg-gray-100 text-gray-700"
            }`}
        >
            {priority}
        </span>
    );
}

export default PriorityBadge;