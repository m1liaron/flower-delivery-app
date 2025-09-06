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
import type { Shop } from "../../common/types";
import { axiosInstance } from "../../helpers/axiosInstance";

const products = [
	{ id: 1, name: "Rose" },
	{ id: 2, name: "Tulip" },
	{ id: 3, name: "Lily" },
	{ id: 4, name: "Rose" },
];

const HomePage = () => {
	const [shops, setShops] = useState([]);
	const [selectedShop, setSelectedShop] = useState<Shop>(shops[0]);

	useEffect(() => {
		const fetchShops = async () => {
			const res = await axiosInstance.get("/shops");
			setShops(res.data);
		};

		fetchShops();
	}, []);

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
						{products.map((product) => (
							<Col md={3} key={product.id} className="mb-3">
								<Card variant="outlined">
									<CardContent className="text-center">
										<IconButton>
											<FavoriteBorderIcon />
										</IconButton>
										<Typography variant="h6">{product.name}</Typography>
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
