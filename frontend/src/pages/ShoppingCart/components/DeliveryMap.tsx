import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

type Location = { lat: number; lng: number; name?: string };

export default function DeliveryMap({ shop, user }: { shop: Location; user: Location }) {
  const [route, setRoute] = useState<L.LatLngExpression[]>([]);
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${shop.lng},${shop.lat};${user.lng},${user.lat}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      if (data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]] // flip lon/lat -> lat/lon
        );
        setRoute(coords);
        setTime(Math.round(data.routes[0].duration / 60)); // minutes
      }
    };
    fetchRoute();
  }, [shop, user]);

  return (
    <MapContainer center={[shop.lat, shop.lng]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Shop marker */}
      <Marker position={[shop.lat, shop.lng]}>
        <Popup>{shop.name}</Popup>
      </Marker>

      {/* User marker */}
      <Marker position={[user.lat, user.lng]}>
        <Popup>Your Address</Popup>
      </Marker>

      {/* Route polyline */}
      {route.length > 0 && <Polyline positions={route} color="blue" />}

      {/* Delivery ETA */}
      {time && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          🚚 Approx. delivery time: {time} min
        </div>
      )}
    </MapContainer>
  );
}
