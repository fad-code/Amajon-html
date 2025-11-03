import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f8f8f8", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Traveloka Lite</h2>
        <div>
          <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        </div>
      </nav>
    </header>
  );
}
