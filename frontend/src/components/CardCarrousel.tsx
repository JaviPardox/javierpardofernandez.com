import Card from "../components/Card";

const CardCarrousel: React.FC = () => {
  return (
    <div className="relative -mx-6 sm:mx-0">
      <div className="-my-4 flex overflow-x-auto scrollbar-hide gap-5 py-4 sm:overflow-x-visible sm:justify-center sm:gap-8">
        <div className="pl-6 sm:pl-0 flex gap-5 sm:gap-8 lg:ml-[25px] ml-0">
          <Card rotation={2} imageId="avatar" />
          <Card rotation={-2} imageId="card1" />
          <Card rotation={2} imageId="card2" />
          <Card rotation={2} imageId="card3" />
          <Card rotation={-2} imageId="card4" />
        </div>
        <div className="shrink-0 w-1 sm:w-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default CardCarrousel;
