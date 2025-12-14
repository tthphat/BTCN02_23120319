import { useParams } from "react-router-dom";

function MovieDetailPage() {
    const { id } = useParams();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold">Movie Detail Page</h1>
            <p className="mt-4">Movie ID: {id}</p>
        </div>
    );
}

export default MovieDetailPage;
