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
        } finally {
            setLoading(false);
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
        <div className="container mx-auto py-8 text-foreground">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">

                {/* Left Column: Poster */}
                <div className="flex flex-col gap-0 rounded-sm overflow-hidden">
                    <div className="relative group aspect-[2/3] w-full">
                        <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Right Column: Information */}
                    <div className="flex flex-col gap-4">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Persons;
