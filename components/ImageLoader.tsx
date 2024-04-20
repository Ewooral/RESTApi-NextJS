import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
export const ImageLoader = () => {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (  
    <Skeleton className="h-11 w-11 rounded-full" />
    )

}
    