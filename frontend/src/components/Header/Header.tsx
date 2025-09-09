import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface HeaderProps {
	setSortBy: (type: "price" | "date" | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSortBy }) => {
	return (
		<Container fluid>
			<Row className="p-3 border-bottom">
				<Col>
					<h5>Main page</h5>
					<NavLink to="/" className="me-3">
						Shop
					</NavLink>
					<NavLink to="/shopping_cart">Shopping Cart</NavLink>
				</Col>

				<Col className="text-end">
					<Button variant="link" onClick={() => setSortBy("price")}>
						Sort by price
					</Button>
					<Button variant="link" onClick={() => setSortBy("date")}>
						Sort by date
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export { Header };
