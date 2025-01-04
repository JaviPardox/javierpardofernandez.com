import { useEffect } from "react";
import Card from "../components/Card";

const CardCarrousel = () => {

  useEffect(() => {
    // Use a small delay to ensure the carousel centers after any navigation scrolling

      const container = document.querySelector(".overflow-x-auto");
      const cards = container?.querySelectorAll(".card-item");
      const middleCard = cards?.[Math.floor((cards?.length || 0) / 2)] as HTMLElement;

      if (container && middleCard) {
        const containerWidth = container.clientWidth;
        const cardOffset = middleCard.offsetLeft;
        const cardWidth = middleCard.clientWidth;
        const scrollPosition = cardOffset - (containerWidth - cardWidth) / 2;
        
        // Use scrollLeft instead of scrollIntoView to avoid affecting page scroll
        container.scrollLeft = scrollPosition;
      }

  }, []);

  return (
    <div className="relative -mx-6 sm:mx-0">
      <div className="-my-4 flex overflow-x-auto scrollbar-hide gap-5 py-4 sm:overflow-x-visible sm:justify-center sm:gap-8 snap-x snap-mandatory">
        <div className="pl-6 sm:pl-0 flex gap-5 sm:gap-8 lg:ml-[25px] ml-0">
          <div className="card-item snap-center">
              <Card rotation={2} imageId="avatar" />
            </div>
            <div className="card-item snap-center">
              <Card rotation={-2} imageId="card1" />
            </div>
            <div className="card-item snap-center">
              <Card rotation={2} imageId="card2" />
            </div>
            <div className="card-item snap-center">
              <Card rotation={2} imageId="card3" />
            </div>
            <div className="card-item snap-center">
              <Card rotation={-2} imageId="card4" />
            </div>
        </div>
        <div className="shrink-0 w-1 sm:w-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default CardCarrousel;
