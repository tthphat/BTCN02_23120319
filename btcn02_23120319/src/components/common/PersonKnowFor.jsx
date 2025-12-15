import { PaginationSection } from "@/components/common/PaginationSection";
import { useState, useEffect } from "react";

function PersonKnowFor({ know_for = [] }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const [knowFor, setKnowFor] = useState([]); // dữ liệu trang hiện tại

    // Hàm gộp các movie trùng ID và merge roles
    const groupMoviesByID = (movies) => {
        const grouped = {};

        movies.forEach(movie => {
            if (!grouped[movie.id]) {
                // Tạo key mới cho movie
                grouped[movie.id] = {
                    ...movie,
                    roles: [{ role: movie.role, character: movie.character }]
                };
            } else {
                // Thêm role vào movie đã tồn tại
                grouped[movie.id].roles.push({ role: movie.role, character: movie.character });
            }
        });

        return Object.values(grouped);
    };

    // Hàm cắt dữ liệu để hiển thị
    useEffect(() => {
        if (!know_for || know_for.length === 0) {
            setKnowFor([]);
            setTotalPages(0);
            return;
        }

        // Group movies trước
        const groupedMovies = groupMoviesByID(know_for);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setKnowFor(groupedMovies.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(groupedMovies.length / pageSize));
    }, [page, know_for]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-l-4 pl-2 border-lime-400 mb-6">Know For</h2>

            <div className="space-y-4 mb-6">
                {knowFor.length === 0 ? (
                    <p className="text-gray-500">No joining any movies yet.</p>
                ) : (
                    knowFor.map((movie) => (
                        <div key={movie.id} className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">{movie.title}</span>
                                    <span className="text-md text-muted-foreground">({movie.year})</span>
                                </div>
                            </div>

                            {/* Roles badges */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {movie.roles.map((roleObj, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-300 px-3 py-1 rounded-full text-sm font-medium capitalize"
                                    >
                                        {roleObj.role}
                                    </span>
                                ))}
                            </div>

                            {/* Character info - only show if exists */}
                            {movie.roles.some(r => r.character) && (
                                <div className="mt-2">
                                    {movie.roles
                                        .filter(r => r.character)
                                        .map((roleObj, idx) => (
                                            <p key={idx} className="text-sm text-muted-foreground">
                                                <span className="font-medium">as {roleObj.role}:</span> {roleObj.character}
                                            </p>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

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

export default PersonKnowFor;
