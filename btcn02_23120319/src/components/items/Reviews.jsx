import { useState, useEffect } from "react";
import { PaginationSection } from "@/components/common/PaginationSection";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function Reviews({ movieID }) {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;


    return (
       
    );
}

export default Reviews;