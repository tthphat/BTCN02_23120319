import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function TopRating() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const getTopRatingMovies = async () => {
        try {
            // Fetch page 1, 2, 3 sau đó gộp lại thành 1 mảng mới đủ 30 phim
            const promises = [1, 2, 3].map(page =>
                fetch(`${API_URL}/movies/top-rated?category=IMDB_TOP_50&page=${page}&limit=10`, {
                    headers: {
                        "x-app-token": APP_TOKEN,
                    },
                }).then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch top-rated movies page ${page}`);
                    return res.json();
                })
            );

            const results = await Promise.all(promises);
            // Gộp mảng
            const allMovies = results.flatMap(data => data.data);
            setMovies(allMovies);
            console.log("Fetched top rating movies:", allMovies);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getTopRatingMovies() }, []);

    return (
        <div className="w-full h-full row-start-3 px-16 relative overflow-hidden flex flex-col">
            <h2 className="text-2xl font-bold border-l-4 border-lime-400 pl-4 mb-6">Top Rating</h2>
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                }}
                className="w-full flex-1 relative"
            >
                <CarouselContent className="w-full h-full">
                    {movies.map(movie => (
                        <CarouselItem
                            key={movie.id}
                            className="basis-1/3 h-full flex justify-center items-center py-4"
                        >
                            <Card
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                className="w-full max-w-[300px] aspect-[2/3] relative overflow-hidden border-0 rounded-xl shadow-lg cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Nền đen khi hover */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                {/* Background gradient đen từ bên dưới */}
                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/90 to-transparent" />

                                {/* Nút Play khi hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                                    <div className="w-12 h-12 rounded-full bg-lime-400 text-black flex items-center justify-center shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-4 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-xl font-bold mb-1 line-clamp-2 leading-tight">
                                        {movie.title}
                                    </h3>

                                    <div className="flex items-center gap-3 text-xs opacity-90 font-medium mb-2">
                                        <span className="flex items-center gap-1 bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-400">
                                            ★ {movie.rate}
                                        </span>
                                        <span className="border border-white/30 px-1.5 py-0.5 rounded text-[10px]">HD</span>
                                    </div>

                                    {/* Thông tin thêm khi hover */}
                                    <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {movie.genres?.slice(0, 2).map((genre, idx) => (
                                                <span key={idx} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                                                    {genre}
                                                </span>
                                            ))}
                                            {movie.genres?.length > 2 && (
                                                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">+{movie.genres.length - 2}</span>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Rank: {movie.rank}</span>
                                        </div>
                                    </div>

                                </div>

                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default TopRating