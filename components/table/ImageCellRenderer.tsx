import Image from 'next/image';
import React from 'react';
type ImageCellRendererProps = {
  value: string;
};

const ImageCellRenderer: React.FC<ImageCellRendererProps> = ({ value }) => {

  if (!value) {
    // Render placeholder image or nothing
    return null;
  }

  // Provide the width and height properties to the Image component
  return (
      <Image
          src={value}
          alt="Cell"
          width={30}
          height={30}
          style={{ borderRadius: '50%', objectFit: 'cover', display: "inline-block", width:"30px", height:"30px"}}
      />
  );
};

export default ImageCellRenderer;
