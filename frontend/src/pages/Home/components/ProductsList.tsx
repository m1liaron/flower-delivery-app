import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import type React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import type { Flower } from "../../../common/types";

interface Props {
	cart: Flower[] | null;
	onIncrease: (id: string) => void;
	onDecrease: (id: string) => void;
	removeProduct: (id: string) => void;
}

const ProductList: React.FC<Props> = ({
	cart,
	onIncrease,
	onDecrease,
	removeProduct,
}) => {
	return (
		<ListGroup>
			{cart?.map((item) => (
				<ListGroup.Item key={item._id} className="d-flex align-items-center">
					<Row className="w-100 align-items-center">
						{/* Flower Title */}
						<Col xs={5}>
							<Typography variant="body1" style={{ fontWeight: 500 }}>
								{item.title}
							</Typography>
						</Col>

						{/* Quantity with arrows */}
						<Col
							xs={5}
							className="d-flex justify-content-end align-items-center"
						>
							<IconButton color="primary" onClick={() => onIncrease(item._id)}>
								<ArrowDropUpIcon />
							</IconButton>

							<Typography variant="body1" style={{ margin: "0 10px" }}>
								{item.count}/{item.availableCount}
							</Typography>

							<IconButton
								color="secondary"
								onClick={() => onDecrease(item._id)}
							>
								<ArrowDropDownIcon />
							</IconButton>
						</Col>

						{/* Remove button */}
						<Col xs={2} className="d-flex justify-content-end">
							<IconButton color="error" onClick={() => removeProduct(item._id)}>
								<CloseIcon />
							</IconButton>
						</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export { ProductList };
