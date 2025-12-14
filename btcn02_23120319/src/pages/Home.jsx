import Best5Movie from "@/components/items/Best5Movies";
import PopularMovies from "@/components/items/PopularMovies";

function Home() {
    return (
        <div className="grid grid-rows-3 gap-5 h-full py-5">
            <Best5Movie />
            <PopularMovies />
            <div>Bottom</div>
        </div>
    );
}

export default Home;