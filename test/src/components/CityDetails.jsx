import { useParams, Link } from "react-router-dom";
import { cities } from "../data";

export default function CityDetails() {
  const { cityId } = useParams();
  const city = cities.find(c => c.id.toString() === cityId);

  if (!city) return <p>City not found!</p>;

  return (
    <main style={{ padding: "1rem" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem", color: "#007bff" }}>← Back</Link>
      <h1>{city.name}</h1>
      <img src={city.image} alt={city.name} style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }} />
      <p>{city.description}</p>

      <section>
        <h2>Hotels</h2>
        <ul>
          {city.hotels.map((hotel, index) => (
            <li key={index}>{hotel.name} - ${hotel.price}/night</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Food Recommendations</h2>
        <ul>
          {city.foods.map((food, index) => (
            <li key={index}>{food.name} - {food.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Attractions</h2>
        <ul>
          {city.attractions.map((place, index) => (
            <li key={index}>{place.name} - {place.description}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
