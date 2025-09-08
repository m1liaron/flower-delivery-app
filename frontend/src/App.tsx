import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/Home/Home";
import { OrderDetailsPage } from "./pages/OrderDetailsPage/OrderDetailsPage";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/shopping_cart" element={<ShoppingCart />} />
				<Route path="/order/:id" element={<OrderDetailsPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
