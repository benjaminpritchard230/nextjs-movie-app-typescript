import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

interface Props extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = ({ src, fallbackSrc, ...rest }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onErrorCapture={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={""}
    />
  );
};

export default ImageWithFallback;
