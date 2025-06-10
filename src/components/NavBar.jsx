import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/">Lista attività</NavLink>
      <NavLink to="/manager">Aggiungi attività</NavLink>
    </nav>
  );
}
