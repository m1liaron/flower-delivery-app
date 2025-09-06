import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/shopping_cart" element={<ShoppingCart />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
