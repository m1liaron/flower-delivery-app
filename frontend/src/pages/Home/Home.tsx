import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Storage_Items } from "../../common/enums";
import type { Flower, Shop } from "../../common/types";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getStorage, setStorage } from "../../storage/localStorage";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface HomePageProps {
  sortBy: "price" | "date" | null;
}

const HomePage: React.FC<HomePageProps> = ({ sortBy }) => {
	const [shops, setShops] = useState<Shop[]>([]);
	const [products, setProducts] = useState<Flower[]>([]);
	const [selectedShop, setSelectedShop] = useState<Shop>(shops[0]);

	
	const sortedProducts = [...products].sort((a, b) => {
		if (a.favorite && !b.favorite) return -1;
		if (!a.favorite && b.favorite) return 1;
		
		if (!sortBy) return 0;
		
		if (sortBy === "price") return a.price - b.price;
		if (sortBy === "date") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		return 0;
	});

	useEffect(() => {
		const fetchShops = async () => {
			const res = await axiosInstance.get("/shops");
			setShops(res.data);
			setSelectedShop(res.data[0]);
		};

		fetchShops();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			if (!selectedShop) return;
			const res = await axiosInstance.get(`/flowers/${selectedShop._id}`);
			setProducts(res.data);
		};

		fetchProducts();
	}, [selectedShop]);

	const addFlowerToCart = (newFlower: Flower) => {
		if (newFlower.count === 0) return;

		const cart = getStorage<Flower[]>(Storage_Items.SHOPPING_CART) ?? [];
		const existingFlower = cart.find((flower) => flower._id === newFlower._id);

		if (existingFlower) {
			const flowerIdx = cart.indexOf(existingFlower);
			const updatedCount = Math.min(existingFlower.count + 1, newFlower.count);
			cart[flowerIdx] = {
				...existingFlower,
				count: updatedCount,
				availableCount: newFlower.count,
			};
		} else {
			cart.push({
				...newFlower,
				count: 1,
				availableCount: newFlower.count,
			});
		}
		setStorage(Storage_Items.SHOPPING_CART, cart);
	};

	const updateProduct = (id: string, favorite: boolean) => {
		setProducts(prev =>
			prev.map(prod =>
				prod._id === id ? { ...prod, favorite } : prod
			)
		);
	};

	const favoriteProduct = async (id: string, currentFavorite: boolean) => {
		try {
			const newFavorite = !currentFavorite;
			await axiosInstance.patch(`/flowers/${id}`, { favorite: newFavorite });
			updateProduct(id, newFavorite);
		} catch (error) {
			if (error instanceof Error) {
			toast.error(error.message);
			}
		}
	};

	return (
		<Container fluid>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
			<Row className="mt-3">
				<Col md={2}>
					<h6>Shops:</h6>
					<ListGroup>
						{shops.map((shop: Shop, idx) => (
							<ListGroup.Item
								key={`${shop._id}-${idx}`}
								action
								active={shop === selectedShop}
								onClick={() => setSelectedShop(shop)}
							>
								{shop.title}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>

				{/* Products Grid */}
				<Col md={10}>
					<Row>
						{sortedProducts.length > 0 &&
							sortedProducts.map((product: Flower) => (
								<Col md={3} key={product._id} className="mb-3">
									<Card variant="outlined">
										<CardContent className="text-center">
											<IconButton onClick={() => favoriteProduct(product._id, product.favorite)}>
												{product.favorite ? (
													<FavoriteIcon style={{ color: "red" }} />
												) : (
													<FavoriteBorderIcon />
												)}
											</IconButton>
											<Typography variant="h6">{product.title}</Typography>
											<Typography variant="h6">{product.count}</Typography>
										</CardContent>
										<CardActions className="justify-content-center">
											<Button
												variant="outline-primary"
												onClick={() => addFlowerToCart(product)}
											>
												Add to Cart
											</Button>
										</CardActions>
									</Card>
								</Col>
							))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export { HomePage };
