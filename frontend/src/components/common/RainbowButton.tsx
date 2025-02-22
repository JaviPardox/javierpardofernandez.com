interface RainbowButtonProps {
  href: string;
  download?: string;
  children: React.ReactNode;
}

const RainbowButton = ({ href, download, children }: RainbowButtonProps) => {
  return (
    <a
      className="rainbow-button inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-medium"
      href={href}
      download={download}
    >
      {children}
    </a>
  );
};

export default RainbowButton; 