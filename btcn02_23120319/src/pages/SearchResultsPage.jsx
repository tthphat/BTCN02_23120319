import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function SearchResultsPage() {
    const [searchParams] = useSearchParams();

    // Lấy catagory và input từ searchParams
    const [[searchType, searchValue]] = searchParams.entries();

    const getSearchResults = async () => {
        try {
            const response = await fetch(`${API_URL}/movies/search?${searchType}=${searchValue}&page=1&limit=10`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSearchResults();
    }, []);

    return (
        <div>
            <h1>Search Results Page</h1>
            <p>{searchType}</p>
            <p>{searchValue}</p>
        </div>
    )
}

export default SearchResultsPage
