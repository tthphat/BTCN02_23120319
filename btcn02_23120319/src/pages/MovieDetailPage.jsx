import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Play, Calendar, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieDetail = async () => {
        try {
            const response = await fetch(`${API_URL}/movies/${id}`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch movie detail");
            }
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (id) {
            fetchMovieDetail();
        }
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!movie) return <div className="text-center py-10">Movie not found</div>;

    return (
        <div className="container mx-auto py-8 text-foreground">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                {/* Left Column: Poster & Actions */}
                <div className="flex flex-col gap-0 rounded-sm overflow-hidden">
                    <div className="relative group aspect-[2/3] w-full">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />

                        {/* Follow Button */}
                        <div className="absolute top-4 left-4">
                            <Button size="sm" variant="secondary" className="gap-2 bg-black/60 hover:bg-black/80 text-white border-none backdrop-blur-sm cursor-pointer">
                                <Heart className="w-4 h-4" />
                                Yêu thích
                            </Button>
                        </div>

                        {/* Play Icon (Center) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Watch Button */}
                    <Button className="w-full rounded-t-none bg-red-700 hover:bg-red-800 text-white font-bold text-lg py-6 rounded-none">
                        XEM PHIM
                    </Button>
                </div>

                {/* Right Column: Information */}
                <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-lime-400 mb-1">{movie.title}</h1>
                        <h2 className="text-xl text-muted-foreground">{movie.full_title} - {movie.countries}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mt-2">
                        {movie.plot_full}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                        {movie.genres?.map((genre, index) => (
                            <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                {genre}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-border my-4" />

                    {/* Rating & Stats */}
                    <div className="flex flex-col gap-4">

                        {/* Stars Section */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-4 border-lime-400 flex items-center justify-center text-lime-400 font-bold text-lg bg-black/20">
                                {movie.rate ? (movie.rate * 10).toFixed(0) : 0}%
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= Math.round(movie.rate) ? 'fill-current' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    (Score: {movie.rate}/10)
                                </span>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Runtime:</span>
                                <span>{movie.runtime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-lime-400" />
                                <span>{movie.year}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;
