import Image from "next/image";

interface PhotoProps {
  url: string;
  alt: string;
  style?: string; 
  width?: number; 
  height?: number;
}

const Photo: React.FC<PhotoProps> = ({ url, alt, style = "", width = 100, height = 100 }) => {
  return (
    <Image
      className={style}
      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${url}`}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Photo;
