import { useEffect, useRef, useState } from 'react';
import { ImageAscii, ArtTypeEnum } from 'image-ascii-art';
import { useTheme } from '@/components/ui/theme-provider';

interface Props {
  src: string;
  height: number;
  width: number;
  fontSize: number;
}

const AsciiArt = ({ src, height, width }: Props) => {
  const [img, setImg] = useState<HTMLImageElement>();
  const parentRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      image.height = height;
      image.width = width;
      setImg(image);
      console.log('image:', image);
    };
  }, [src, height, width]);

  return (
    <div ref={parentRef} className='w-64 h-64'>
      {img && (
        <ImageAscii
          image={img}
          parentRef={parentRef}
          artType={ArtTypeEnum.ASCII}
          charsPerLine={150}
          charsPerColumn={150}
          fontColor={theme === 'dark' ? 'white' : 'black'}
          backgroundColor={theme === 'dark' ? 'black' : 'white'}
        />
      )}
    </div>
  );
};

export default AsciiArt;
