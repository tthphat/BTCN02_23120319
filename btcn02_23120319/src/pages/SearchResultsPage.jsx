import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    // Lấy catagory và input từ searchParams
    const [[searchType, searchValue]] = searchParams.entries();

    const getSearchResults = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSearchResults();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-lg text-muted-foreground">Searching for results...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Search Results Page</h1>
            <p>{searchType}</p>
            <p>{searchValue}</p>
        </div>
    )
}

export default SearchResultsPage
