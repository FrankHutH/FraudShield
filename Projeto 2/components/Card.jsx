// Murilo Lobato - RA: 10752958

export default function Card({ children, className = "" }) {
  return (
    <li className={["cartao", className].filter(Boolean).join(" ")}>
      {children}
    </li>
  );
}
