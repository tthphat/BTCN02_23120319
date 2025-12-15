import { useState, useEffect } from "react";
import { PaginationSection } from "@/components/common/PaginationSection";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function Reviews({ movieID }) {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    async function getReviews() {
        try {
            // Gọi fetch lấy data reviews theo id của movie
            const res = await fetch(`${API_URL}/movies/${movieID}/reviews?page=${page}&limit=${pageSize}&sort=newest`, {
                method: "GET",
                headers: {
                    "x-app-token": APP_TOKEN,
                },
            });

            if (!res.ok) {
                console.log("Error status:", res.status);
                return;
            }

            const data = await res.json();
            console.log(data);
            if (data.data) {
                setReviews(data.data); //Cập nhật reviews
            }

            if (data.pagination) {
                setTotalPages(data.pagination.total_pages); //Cập nhật tổng số trang
            }

        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    }

    useEffect(() => {
        if (movieID) {
            getReviews();
        }
    }, [page, movieID]); // gọi lại mỗi khi page hoặc movieID thay đổi

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold border-l-4 border-lime-400 mb-6">Reviews</h2>

            <div className="space-y-4 mb-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">{review.username}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                                    <span>★</span> {review.rate}
                                </div>
                            </div>

                            {review.title && <h3 className="font-medium mb-1">{review.title}</h3>}

                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {review.content}
                            </p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default Reviews;