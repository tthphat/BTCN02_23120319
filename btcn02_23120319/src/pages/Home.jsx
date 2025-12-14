import Best5Movie from "@/components/items/Best5Movie";

function Home() {
    return (
        <div className="grid grid-rows-[2fr_1fr_1fr] gap-2 h-full py-2">
            <Best5Movie />
            <div>Center</div>
            <div>Bottom</div>
        </div>
    );
}

export default Home;