import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/Home/Home";
import { OrderDetailsPage } from "./pages/OrderDetailsPage/OrderDetailsPage";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";
import { useState } from "react";

type SortType = "price" | "date" | null;

function App() {
	const [sortBy, setSortBy] = useState<SortType>(null);

	return (
		<BrowserRouter>
			<Header setSortBy={setSortBy} />
			<Routes>
				<Route path="/" element={<HomePage sortBy={sortBy} />} />
				<Route path="/shopping_cart" element={<ShoppingCart />} />
				<Route path="/order/:id" element={<OrderDetailsPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
