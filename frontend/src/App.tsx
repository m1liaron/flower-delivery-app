import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart";
import { Header } from "./components/Header/Header";

function App() {
	return (
		<BrowserRouter>
			<Header/>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/shopping_cart" element={<ShoppingCart />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
