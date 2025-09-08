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
import type { Flower, Shop } from "../../common/types";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getStorage, setStorage } from "../../storage/localStorage";
import { Storage_Items } from "../../common/enums";

const HomePage = () => {
	const [shops, setShops] = useState<Shop[]>([]);
	const [products, setProducts] = useState<Flower[]>([]);
	const [selectedShop, setSelectedShop] = useState<Shop>(shops[0]);

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
		const existingFlower = cart.find(flower => flower._id == newFlower._id);

		if (existingFlower) {
			const flowerIdx = cart.indexOf(existingFlower);
			const updatedCount = Math.min(existingFlower.count + 1, newFlower.count);
			cart[flowerIdx] = { 
				...existingFlower, 
				count: updatedCount, 
				availableCount: newFlower.count
			};
		} else {
			 cart.push({ 
				...newFlower, 
				count: 1, 
				availableCount: newFlower.count
			});
		}
		setStorage(Storage_Items.SHOPPING_CART, cart);
	}

	return (
		<Container fluid>
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
						{products.length > 0 &&
							products.map((product: Flower) => (
								<Col md={3} key={product._id} className="mb-3">
									<Card variant="outlined">
										<CardContent className="text-center">
											<IconButton>
												<FavoriteBorderIcon />
											</IconButton>
											<Typography variant="h6">{product.title}</Typography>
											<Typography variant="h6">{product.count}</Typography>
										</CardContent>
										<CardActions className="justify-content-center">
											<Button variant="outline-primary" onClick={() => addFlowerToCart(product)}>Add to Cart</Button>
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
