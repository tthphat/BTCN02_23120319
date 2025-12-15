import { useSearchParams } from "react-router-dom"

function SearchResultsPage() {
    const [searchParams] = useSearchParams();

    const [[searchType, searchValue]] = searchParams.entries();

    return (
        <div>
            <h1>Search Results Page</h1>
            <p>{searchType}</p>
            <p>{searchValue}</p>
        </div>
    )
}

export default SearchResultsPage
