interface ContactButtonProps {
  href: string;
  children: React.ReactNode;
}

const ContactButton = ({ href, children }: ContactButtonProps) => {
  return (
    <a
      className="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-medium bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 active:bg-zinc-800/50 active:text-zinc-50/70"
      href={href}
    >
      {children}
    </a>
  );
};

export default ContactButton; 