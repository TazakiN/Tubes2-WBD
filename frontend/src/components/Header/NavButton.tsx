import { Link } from "@tanstack/react-router";

interface NavButtonProps {
  imgSrc: string;
  navRoute: string;
  navText: string;
}

function NavButton({ imgSrc, navRoute, navText }: NavButtonProps) {
  const altText = navRoute + " logo";

  return (
    <Link to={navRoute} className="flex flex-col items-center gap-1">
      <img src={imgSrc} alt={altText} className="max-h-6" />
      <span className="text-xs text-blue-primary">{navText}</span>
    </Link>
  );
}

export default NavButton;
