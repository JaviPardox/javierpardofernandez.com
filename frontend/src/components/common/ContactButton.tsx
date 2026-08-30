interface ContactButtonProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const ContactButton = ({ href, children, onClick }: ContactButtonProps) => {
  return (
    <a
      className="contact-button inline-flex items-center justify-center rounded-md py-2 px-6 text-base outline-offset-2 transition active:transition-none font-medium whitespace-nowrap"
      href={href}
      onClick={onClick}
    >
      <span className="contact-text flex items-center gap-2">{children}</span>
    </a>
  );
};

export default ContactButton; 