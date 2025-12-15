import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader2, Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]); // mảng danh sách các kết quả tìm kiếm


    // Lấy catagory và input từ searchParams
    const [[searchType, searchValue]] = searchParams.entries();

    const getSearchResults = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/movies/search?${searchType}=${searchValue}&page=1&limit=10`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);

            setResults(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSearchResults();
    }, [searchType, searchValue]);//

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-lg text-muted-foreground">Searching for results...</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((movie) => (
                    <div key={movie.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-border">
                        {/* Poster phim */}
                        <Link to={`/movies/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </Link>

                        {/* Thông tin phim */}
                        <div className="p-4">
                            <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
                                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                            </h3>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{movie.year}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span>{movie.rate}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default SearchResultsPage
