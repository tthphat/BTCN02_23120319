import { PaginationSection } from "@/components/common/PaginationSection";
import { useState, useEffect } from "react";

function PersonKnowFor({ know_for }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const [knowFor, setKnowFor] = useState([]); // dữ liệu trang hiện tại

    // Hàm cắt dữ liệu để hiển thị
    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setKnowFor(know_for.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(know_for.length / pageSize));
    }, [page, know_for]);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Know For</h3>

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