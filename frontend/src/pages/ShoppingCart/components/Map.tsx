import {
	MapContainer,
	Marker,
	Polyline,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { useEffect, useState } from "react";

type Location = { lat: number; lng: number; name?: string; address?: string };

type Props = {
	shop: Location;
	user?: Location;
	onUserSelect?: (place: Location) => void;
};

const shopIcon = new L.Icon({
	iconUrl: "/shop-logo.png", // put logo in public/
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

function MapClickHandler({
	onUserSelect,
}: {
	onUserSelect?: (place: Location) => void;
}) {
	useMapEvents({
		click: async (e) => {
			const { lat, lng } = e.latlng;
			if (!onUserSelect) return;
			try {
				const res = await axios.get(
					`http://localhost:3000/api/reverse?lat=${lat}&lon=${lng}`,
				);
				const address = res.data?.display_name || "";
				onUserSelect({ lat, lng, address });
			} catch {
				onUserSelect({ lat, lng });
			}
		},
	});
	return null;
}

export default function DeliveryOSMMap({ shop, user, onUserSelect }: Props) {
	const [route, setRoute] = useState<[number, number][]>([]);

	useEffect(() => {
		const fetchRoute = async () => {
			if (!user?.lat || !user?.lng) return;
			try {
				const res = await axios.get(
					"https://router.project-osrm.org/route/v1/driving/" +
						`${shop.lng},${shop.lat};${user.lng},${user.lat}?overview=full&geometries=geojson`,
				);
				const coords = res.data.routes[0].geometry.coordinates.map(
					(c: [number, number]) => [c[1], c[0]],
				);
				setRoute(coords);
			} catch (err) {
				console.error("Route error:", err);
			}
		};
		fetchRoute();
	}, [shop, user]);

	return (
		<MapContainer
			center={[shop.lat, shop.lng]}
			zoom={13}
			style={{ height: 300, width: "100%", marginTop: 16 }}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{/* Shop marker */}
			<Marker position={[shop.lat, shop.lng]} icon={shopIcon} />

			{/* User marker */}
			{user?.lat && user?.lng && <Marker position={[user.lat, user.lng]} />}

			{/* Route polyline */}
			{route.length > 0 && <Polyline positions={route} color="blue" />}

			<MapClickHandler onUserSelect={onUserSelect} />
		</MapContainer>
	);
}
