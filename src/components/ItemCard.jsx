import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
    return (
        <Link
            to={`/details/${item.name}`}
            className="border rounded-md p-4 shadow hover:bg-gray-100 transition"
        >
            <h3 className="text-lg font-bold capitalize">{item.name}</h3>
        </Link>
    );
}