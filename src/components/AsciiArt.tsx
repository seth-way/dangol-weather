import { useEffect, useRef, useState } from 'react';
import { ImageAscii, ArtTypeEnum } from 'image-ascii-art';
//import { useTheme } from '@/components/ui/theme-provider';

interface AsciiProps {
  src: string;
  height: number;
  width: number;
  fontSize: number;
}

const AsciiArt = ({ src, height, width }: AsciiProps) => {
  const [img, setImg] = useState<HTMLImageElement>();
  const parentRef = useRef(null);
  //const { theme } = useTheme();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      image.height = height;
      image.width = width;
      setImg(image);
    };
  }, [src, height]);

  return (
    <div ref={parentRef} className='w-64 h-60'>
      {img && (
        <ImageAscii
          image={img}
          parentRef={parentRef}
          artType={ArtTypeEnum.ASCII}
          charsPerLine={150}
          charsPerColumn={150}
          fontColor='white'
          backgroundColor='black'
          // fontColor={theme === 'dark' ? 'white' : 'black'}
          // backgroundColor={theme === 'dark' ? 'black' : 'white'}
        />
      )}
    </div>
  );
};

export default AsciiArt;
