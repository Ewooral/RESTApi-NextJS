import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
type ImageCellRendererProps = {
  value: string;
};

const ImageCellRenderer: React.FC<ImageCellRendererProps> = ({ value }) => {
  if (!value) {
    return (
      // <div
      //   style={{
      //     width: "30px",
      //     height: "30px",
      //     borderRadius: "50%",
      //     backgroundColor: "#ccc",
      //     color: "white",
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     fontSize: "16px",
      //   }}
      // >
      //  <span className='text-[9px]'>N/A</span>
      // </div>
      <div className="flex justify-center items-center mt-1 w-8 h-8 bg-[#669afa] animate-pulse rounded-full">
        <Skeleton className="w-[26px] h-[26px] rounded-full" />
      </div>
    );
  }

  // Provide the width and height properties to the Image component
  return (
    <Image
      src={value}
      alt="Cell"
      width={30}
      height={30}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        display: "inline-block",
        width: "30px",
        height: "30px",
      }}
    />
  );
};

export default ImageCellRenderer;
