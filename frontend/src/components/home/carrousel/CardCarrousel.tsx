import { useEffect } from "react";
import Card from "./Card";
import FadeOnScroll from "../../common/FadeOnScroll";

const CardCarrousel = () => {

  useEffect(() => {
    // Ensure each carousel centers on mount
    const containers = document.querySelectorAll(".card-carousel-scroll");

    containers.forEach((container) => {
      const cards = container.querySelectorAll(".card-item");
      const middleCard = cards?.[Math.floor((cards.length || 0) / 2)] as HTMLElement | undefined;

      if (container instanceof HTMLElement && middleCard) {
        const containerWidth = container.clientWidth;
        const cardOffset = middleCard.offsetLeft;
        const cardWidth = middleCard.clientWidth;
        const scrollPosition = cardOffset - (containerWidth - cardWidth) / 2;

        container.scrollLeft = scrollPosition;
      }
    });
  }, []);

  return (
    <div className="relative -mx-6 sm:mx-0">
      <FadeOnScroll className="sm:hidden" variant="pop" flashy viewportMargin="-50px 0px -300px 0px">
        <div className="-my-4 flex overflow-x-auto card-carousel-scroll scrollbar-hide gap-5 py-4 snap-x snap-mandatory">
          <div className="pl-6 flex gap-5 ml-0">
            {[{ rotation: 2, imageId: "card6" }, { rotation: -2, imageId: "card1" }, { rotation: 2, imageId: "card2" }, { rotation: 2, imageId: "card5" }, { rotation: -2, imageId: "card4" }].map(
              ({ rotation, imageId }, index) => (
                <div key={index} className="card-item snap-center">
                  <Card rotation={rotation} imageId={imageId} />
                </div>
              )
            )}
          </div>
          <div className="shrink-0 w-1" aria-hidden="true" />
        </div>
      </FadeOnScroll>
      <div className="hidden sm:flex -my-4 overflow-x-auto card-carousel-scroll scrollbar-hide gap-5 py-4 sm:overflow-x-visible sm:justify-center sm:gap-8 snap-x snap-mandatory">
        <div className="pl-6 sm:pl-0 flex gap-5 sm:gap-8 lg:ml-[25px] ml-0">
          <FadeOnScroll delay={0.1} variant="pop" flashy className="card-item snap-center" viewportMargin="-50px 0px -300px 0px">
            <Card rotation={2} imageId="card6" />
          </FadeOnScroll>
          <FadeOnScroll delay={0} variant="pop" flashy className="card-item snap-center" viewportMargin="-50px 0px -300px 0px">
            <Card rotation={-2} imageId="card1" />
          </FadeOnScroll>
          <FadeOnScroll delay={0.2} variant="pop" flashy className="card-item snap-center" viewportMargin="-50px 0px -300px 0px">
            <Card rotation={2} imageId="card2" />
          </FadeOnScroll>
          <FadeOnScroll delay={0.05} variant="pop" flashy className="card-item snap-center" viewportMargin="-50px 0px -300px 0px">
            <Card rotation={2} imageId="card5" />
          </FadeOnScroll>
          <FadeOnScroll delay={0.15} variant="pop" flashy className="card-item snap-center" viewportMargin="-50px 0px -300px 0px">
            <Card rotation={-2} imageId="card4" />
          </FadeOnScroll>
        </div>
        <div className="shrink-0 w-1 sm:w-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default CardCarrousel;

