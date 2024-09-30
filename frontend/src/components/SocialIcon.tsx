type FillRule = "nonzero" | "evenodd" | "inherit" | undefined;

interface SocialIconProps {
  href: string;
  ariaLabel: string;
  iconPaths: { d: string; fillRule?: FillRule; clipRule?: FillRule }[];
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  ariaLabel,
  iconPaths,
}) => (
  <a className="group -m-1 p-1" aria-label={ariaLabel} href={href}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-zinc-400 transition group-hover:fill-zinc-300"
    >
      {iconPaths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
        ></path>
      ))}
    </svg>
  </a>
);

export default SocialIcon;
