import { Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<Row className="p-3 border-bottom">
			<Col>
				<h5>Main page</h5>
				<NavLink to="/" className="me-3">
					Shop
				</NavLink>
				<NavLink to="/shopping_cart">Shopping Cart</NavLink>
			</Col>

			<Col className="text-end">
				<Button variant="link">Sort by price</Button>
				<Button variant="link">Sort by date</Button>
			</Col>
		</Row>
	);
};

export { Header };
