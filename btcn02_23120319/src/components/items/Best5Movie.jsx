import { Card } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function Best5Movie() {

    const getBest5Movie = async () => {
        const response = await fetch(`${API_URL}/movies/most-popular?page=1&limit=5`, {
            method: "GET",
            headers: {
                "x-app-token": APP_TOKEN,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch best 5 movie");
        }
        const data = await response.json();
        return data;
    }


    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Best 5 Movie</CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
}

export default Best5Movie;  
