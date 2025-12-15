import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationSection({ page, totalPages, setPage }) {
    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setPage(Math.max(1, page - 1))}
                    />
                </PaginationItem>
                <span className="sm:hidden text-sm text-gray-600">
                    Page {page} / {totalPages}
                </span>

                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem className="hidden sm:block" key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}
