import { useState } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const shops = ["Flowery Fragrant", "Bloomwell", "etc..", "etc..", "etc.."];

const products = [
  { id: 1, name: "Rose" },
  { id: 2, name: "Tulip" },
  { id: 3, name: "Lily" },
  { id: 4, name: "Rose" },
];

const HomePage =  () => {
  const [selectedShop, setSelectedShop] = useState(shops[0]);

  return (
	<Container fluid>
	  <Row className="mt-3">
		{/* Sidebar Shops */}
		<Col md={2}>
		  <h6>Shops:</h6>
		  <ListGroup>
			{shops.map((shop, idx) => (
			  <ListGroup.Item
				key={`${shop}-${idx}`}
				action
				active={shop === selectedShop}
				onClick={() => setSelectedShop(shop)}
			  >
				{shop}
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
					<Button
					  variant="outline-primary"
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
}

export { HomePage };