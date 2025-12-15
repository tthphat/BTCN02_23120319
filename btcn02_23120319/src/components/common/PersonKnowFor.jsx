import { PaginationSection } from "@/components/common/PaginationSection";
import { useState, useEffect } from "react";

function PersonKnowFor({ know_for = [] }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const [knowFor, setKnowFor] = useState([]); // dữ liệu trang hiện tại

    // Hàm cắt dữ liệu để hiển thị
    useEffect(() => {
        if (!know_for || know_for.length === 0) {
            setKnowFor([]);
            setTotalPages(0);
            return;
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setKnowFor(know_for.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(know_for.length / pageSize));
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
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">{movie.title}</span>
                                    <span className="text-md text-muted-foreground">{movie.year}</span>
                                </div>
                                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                                    <span>Role:</span> {movie.role}
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {movie.character || ""}
                            </p>
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
