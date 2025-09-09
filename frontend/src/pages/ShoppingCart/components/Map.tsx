import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  center: { lat: number; lng: number };
  onSelect?: (place: { lat: number; lng: number; display_name: string }) => void;
};

function MapClickHandler({ onSelect }: { onSelect?: Props["onSelect"] }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      if (!onSelect) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/geocode?lat=${lat}&lon=${lng}`);
        const address = res.data?.display_name || "";
        onSelect({ lat, lng, display_name: address });
      } catch (err) {
        console.error("Reverse geocode error:", err);
        onSelect({ lat, lng, display_name: "" });
      }
    },
  });
  return null;
}

export function OSMMap({ center, onSelect }: Props) {
  const [markerPos, setMarkerPos] = useState(center);

  useEffect(() => {
    setMarkerPos(center); // Update marker if center prop changes
  }, [center]);

  const handleSelect = (place: { lat: number; lng: number; display_name: string }) => {
    setMarkerPos({ lat: place.lat, lng: place.lng });
    onSelect?.(place);
  };

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: 300, width: "100%", marginTop: 16 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[markerPos.lat, markerPos.lng]} />
      <MapClickHandler onSelect={handleSelect} />
    </MapContainer>
  );
}
