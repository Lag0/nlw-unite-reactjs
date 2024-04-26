import { NavLink } from "./nav-link";
import nlwIcon from "../assets/nlw-unite-icon.svg";

export default function Header() {
  return (
    <header className="flex items-center gap-5 py-2 px-4">
      <a href="/">
        <img src={nlwIcon} alt="NLW Unite" />
      </a>
      <nav className="flex items-center gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/eventos/warung-day-curitiba/participantes">
          Participantes
        </NavLink>
      </nav>
    </header>
  );
}
