interface WhatIOfferListItemProps {
    icon: React.ReactNode; // Accepts a JSX element for the icon
    title: string; // The title for the list item
    description: string; // The description for the list item
  }
  
  const WhatIOfferListItem: React.FC<WhatIOfferListItemProps> = ({
    icon,
    title,
    description,
  }) => {
    return (
      <li className="relative group flex flex-col items-start">
        <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition md:group-hover:scale-100 md:group-hover:opacity-100 sm:-inset-x-6 rounded-2xl"></span>
        <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
          {icon}
        </i>
        <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm">{description}</p>
      </li>
    );
  };
  
  export default WhatIOfferListItem;  