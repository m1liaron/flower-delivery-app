import { Button, Col, Row } from "react-bootstrap";

const Header = () => {

    return (
        <Row className="p-3 border-bottom">
            <Col>
            <h5>Main page</h5>
            <a href="#shop" className="me-3">
                Shop
            </a>
            <a href="#cart">Shopping Cart</a>
            </Col>
            <Col className="text-end">
            <Button variant="link">Sort by price</Button>
            <Button variant="link">Sort by date</Button>
            </Col>
        </Row>
    )
}

export { Header };