import axios from "axios";
import { useState } from "react";

type Suggestion = {
	lat: string;
	lon: string;
	display_name: string;
};

type Props = {
	value: string;
	onChange: (val: string) => void;
	onSelect: (place: { lat: number; lng: number; display_name: string }) => void;
};

export function AddressAutocomplete({ value, onChange, onSelect }: Props) {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchSuggestions = async (q: string) => {
		if (!q) return setSuggestions([]);
		setLoading(true);
		try {
			const res = await axios.get<Suggestion[]>(
				`http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
			);
			setSuggestions(res.data);
		} catch (err) {
			console.error("Nominatim error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ position: "relative" }}>
			<input
				type="text"
				placeholder="Enter address"
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
					fetchSuggestions(e.target.value);
				}}
				style={{
					width: "100%",
					padding: "8px",
					borderRadius: "8px",
					border: "1px solid #ccc",
				}}
			/>
			{loading && <div>Loading...</div>}
			{suggestions.length > 0 && (
				<ul
					style={{
						position: "absolute",
						top: "40px",
						width: "100%",
						background: "white",
						maxHeight: 200,
						overflowY: "auto",
						border: "1px solid #ccc",
						borderRadius: 8,
						zIndex: 1000,
					}}
				>
					{suggestions.map((s) => (
						<li
							key={s.lat + s.lon}
							style={{ padding: "6px 8px", cursor: "pointer" }}
							onClick={() => {
								onSelect({
									lat: parseFloat(s.lat),
									lng: parseFloat(s.lon),
									display_name: s.display_name,
								});
								onChange(s.display_name);
								setSuggestions([]);
							}}
						>
							{s.display_name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
