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
			const res = await axiosInstance.get(`/flowers/${selectedShop._id}`);
			setProducts(res.data);
		};

		fetchProducts();
	}, [selectedShop]);

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
						{products.map((product: Flower) => (
							<Col md={3} key={product._id} className="mb-3">
								<Card variant="outlined">
									<CardContent className="text-center">
										<IconButton>
											<FavoriteBorderIcon />
										</IconButton>
										<Typography variant="h6">{product.title}</Typography>
									</CardContent>
									<CardActions className="justify-content-center">
										<Button variant="outline-primary">Add to Cart</Button>
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
