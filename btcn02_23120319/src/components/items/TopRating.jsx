import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


function TopRating() {
    return (
        <div className="w-full h-full row-start-2 px-16 relative overflow-hidden flex flex-col">
            <h2 className="text-2xl font-bold border-l-4 border-lime-400 pl-4 mb-6">Top Rating</h2>

        </div>
    )
}