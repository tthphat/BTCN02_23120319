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
       
    );
}

export default Reviews;