import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader2, Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { PaginationSection } from "@/components/common/PaginationSection"

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function SearchResultsPage() {
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]); // mảng danh sách các kết quả tìm kiếm
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;


    // Lấy catagory và input từ searchParams
    const [[searchType, searchValue]] = searchParams.entries();

    const getSearchResults = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/movies/search?${searchType}=${searchValue}&page=${page}&limit=${pageSize}`, {
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
            setTotalPages(data.pagination.total_pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSearchResults();
    }, [searchType, searchValue, page]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-lg text-muted-foreground">Searching for results...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((movie) => (
                    <div key={movie.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:scale-110 hover:z-10">
                        {/* Poster phim */}
                        <Link to={`/movies/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                            {/* Thông tin xuất hiện thêm khi hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex flex-wrap gap-1">
                                    {movie.genres?.slice(0, 2).map((genre, idx) => (
                                        <span key={idx} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                            {genre}
                                        </span>
                                    ))}
                                    {movie.genres?.length > 2 && (
                                        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                            +{movie.genres.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
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

            {/* Phân trang */}
            {totalPages > 1 && (
                <PaginationSection
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </div>
    );
}

export default SearchResultsPage
