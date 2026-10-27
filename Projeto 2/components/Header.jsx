// Murilo Lobato - RA: 10752958

import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="cabecalho-principal">
      <a className="marca" href="/" aria-label="FraudShield — início">
        <img src="/img/logo.png" alt="" />
        <span>Fraud<b>Shield</b></span>
      </a>
      <Navbar />
      <ThemeToggle />
    </header>
  );
}
