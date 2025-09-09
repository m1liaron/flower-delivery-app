import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import type { Flower, Order } from "../../common/types";
import { axiosInstance } from "../../helpers/axiosInstance";

const OrderDetailsPage = () => {
	const { id } = useParams();
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await axiosInstance.get(`/orders/${id}`);
				setOrder(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchOrder();
	}, [id]);

	if (loading) return <Spinner animation="border" />;

	if (!order) return <Typography variant="h6">Order not found</Typography>;

	return (
		<Container className="mt-5">
			<Typography variant="h4" gutterBottom>
				Order Details
			</Typography>
			<Typography variant="h6" gutterBottom>
				Order #{order._id.slice(-4)}
			</Typography>
			<Table borderless>
				<tbody>
					{order.products.map((product: Flower) => (
						<tr key={product._id}>
							<td style={{ width: "80px" }}></td>
							<td>
								<Typography variant="body1">{product.title}</Typography>
							</td>
							<td>
								<Typography variant="body1">x {product.count}</Typography>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Divider style={{ margin: "20px 0" }} />

			<Row>
				<Col md={6}>
					<Typography variant="subtitle1">Total:</Typography>
				</Col>
				<Col md={6}>
					<Typography variant="subtitle1" align="right">
						${order.total.toFixed(2)}
					</Typography>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Typography variant="subtitle1">Delivery Address:</Typography>
				</Col>
				<Col md={6}>
					<Typography variant="subtitle1" align="right">
						{order.address}
					</Typography>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Typography variant="subtitle1">Date:</Typography>
				</Col>
				<Col md={6}>
					<Typography variant="subtitle1" align="right">
						{new Date(order.date).toLocaleString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
							hour: "numeric",
							minute: "numeric",
						})}
					</Typography>
				</Col>
			</Row>
		</Container>
	);
};

export { OrderDetailsPage };
