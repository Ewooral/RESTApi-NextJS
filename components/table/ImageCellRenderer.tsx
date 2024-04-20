import Image from 'next/image';
import { FC } from 'react';

type ImageCellRendererProps = {
  value: string;
  setImageUrl: (url: string) => void;
};

const ImageCellRenderer: FC<ImageCellRendererProps> = ({ value, setImageUrl }) => {
  const handleClick = () => {
    setImageUrl(value);
  };

  return value ? (
    <Image
      src={value}
      alt="User"
      width={100}
      height={100}
      style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #9b9797', objectFit:'cover' }}
      onClick={handleClick}
    />
  ) : null;
};

export default ImageCellRenderer;