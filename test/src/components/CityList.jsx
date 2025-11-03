import { Link } from "react-router-dom";
import { cities } from "../data";

export default function CityList() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Explore Cities</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        {cities.map(city => (
          <div key={city.id} style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
            <img src={city.image} alt={city.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <div style={{ padding: "0.5rem" }}>
              <h3>{city.name}</h3>
              <p>{city.description}</p>
              <Link to={`/city/${city.id}`} style={{ color: "#007bff" }}>See details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
