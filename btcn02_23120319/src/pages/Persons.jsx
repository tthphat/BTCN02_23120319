import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;


function Persons() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPerson = async () => {
        try {
            const response = await fetch(`${API_URL}/persons/${id}`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch person detail");
            }
            const data = await response.json();
            setPerson(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            getPerson();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Persons</h1>
        </div>
    );
}

export default Persons;
