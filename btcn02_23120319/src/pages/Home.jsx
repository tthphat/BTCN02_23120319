import Best5Movie from "@/components/items/Best5Movies";
import PopularMovies from "@/components/items/PopularMovies";
import TopRating from "@/components/items/TopRating";

function Home() {
    return (
        <div className="grid grid-rows-3 gap-5 h-full py-5">
            <Best5Movie />
            <PopularMovies />
            <TopRating />
        </div>
    );
}

export default Home;