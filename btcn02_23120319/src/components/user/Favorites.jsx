import { PaginationSection } from "@/components/common/PaginationSection";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Calendar, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function Favorites() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [allFavorites, setAllFavorites] = useState([]); // Danh sách toàn bộ favorites movie
    const [favorites, setFavorites] = useState([]); // Danh sách favorites movie trong 1 trang
    const [page, setPage] = useState(1); // Số trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const pageSize = 3; // Số lượng phim hiển thị trong 1 trang

    // Hàm fetch data favorites movie
    const getFavorites = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/users/favorites`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch favorites");
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setAllFavorites(data);
                setTotalPages(Math.ceil(data.length / pageSize) || 1);
            } else {
                setAllFavorites([]);
                setTotalPages(1);
            }

            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm cắt dữ liệu để hiển thị
    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setFavorites(allFavorites.slice(startIndex, endIndex));
    }, [page, allFavorites]);

    // Gọi hàm fetch api, chỉ khi token thay đổi
    useEffect(() => {
        getFavorites();
    }, [token]);

    const removeFavorite = async (movieID) => {
        if (!confirm("Remove this movie from favorites?")) return;
        try {
            const response = await fetch(`${API_URL}/users/favorites/${movieID}`, {
                method: "DELETE",
                headers: {
                    "x-app-token": APP_TOKEN,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Load lại danh sách favorites
                getFavorites();
            }
        } catch (error) {
            console.error("Failed to remove favorite", error);
        }
    }

    if (loading && favorites.length === 0) return <div className="text-center py-10">Loading favorites...</div>;

    return (
        <>
            {token ?
                (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold border-l-4 border-lime-400 pl-4">My Favorite Movies</h2>

                        {favorites.length === 0 ? (
                            <div className="text-center py-12 bg-muted/30 rounded-lg">
                                <p className="text-muted-foreground text-lg mb-2">You haven't added any favorites yet.</p>
                                <Link to="/" className="text-blue-500 hover:underline">Explore movies to add</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((movie) => (
                                    <div key={movie.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-border">
                                        {/* Poster phim */}
                                        <Link to={`/movies/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden">
                                            <img
                                                src={movie.image_url}
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
                                                    <span>{movie.release_year}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span>{movie.external_ratings.rottenTomatoes}</span>
                                                </div>
                                            </div>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-full gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeFavorite(movie.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </Button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Phân trang */}
                        {totalPages > 1 && (
                            <PaginationSection
                                page={page}
                                totalPages={totalPages}
                                setPage={setPage}
                            />
                        )}

                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <Card className="w-sm h-[200px] md:w-lg md:h-[300px] flex justify-center items-center">
                            <div className="flex flex-col items-center justify-center p-5 gap-5">
                                <h1 className="text-xl font-semibold">Login or Sigup to see your profile</h1>
                                <Button className="w-50 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all" onClick={() => { navigate("/login") }}>
                                    Login
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
        </>
    );
}

export default Favorites;
