import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import React from "react";

type Props = {};

const CoreCar = (props: Props) => {
  return (
    <div className="local-bootstrap">
      <CCarousel>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={
              "https://www.themoviedb.org/t/p/w1280/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg"
            }
            alt="slide 1"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={
              "https://www.themoviedb.org/t/p/w500//sv1xJUazXeYqALzczSZ3O6nkH75.jpg"
            }
            alt="slide 2"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src={
              "https://www.themoviedb.org/t/p/w1280/130H1gap9lFfiTF9iDrqNIkFvC9.jpg"
            }
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default CoreCar;
