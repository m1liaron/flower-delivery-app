import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import {
	type Control,
	Controller,
	type FieldErrors,
	useForm,
} from "react-hook-form";
import { getStorage, setStorage } from "../../storage/localStorage";
import { Storage_Items } from "../../common/enums";
import type { Flower } from "../../common/types";
import { ProductList } from "../Home/components/ProductsList";
import { useEffect, useState } from "react";

type FormValues = {
	name: string;
	email: string;
	phone: number;
	address: string;
};

const renderInput = (
	control: Control<FormValues>,
	errors: FieldErrors<FormValues>,
	name: keyof FormValues,
	label: string,
	type: string,
	rules: any = {},
) => (
	<div className="mb-3">
		<Controller
			name={name}
			control={control}
			defaultValue={"" as any}
			rules={rules}
			render={({ field }) => (
				<TextField
					{...field}
					fullWidth
					label={label}
					type={type}
					variant="outlined"
					error={!!errors[name]}
					helperText={errors[name]?.message as string}
				/>
			)}
		/>
	</div>
);

const ShoppingCart = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const [cart, setCart] = useState<Flower[]>([]);

	useEffect(() => {
		const storedCart = getStorage<Flower[]>(Storage_Items.SHOPPING_CART) ?? [];
    	setCart(storedCart);
	}, []);


	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	const updateCount = (productId: string, action: "dec" | "inc") => {
		const updatedCart = cart.map((product: Flower) => {
			if (product._id === productId) {
				const newCount =
					action === "dec"
						? Math.max(1, product.count - 1)
						: Math.min(product.count + 1, product.availableCount);
				return { ...product, count: newCount };
			}
			return product;
		});

		setCart(updatedCart);
		setStorage(Storage_Items.SHOPPING_CART, updatedCart); 
	};

	const removeFlowerFromCart = (id: string) => {
		let cart = getStorage<Flower[]>(Storage_Items.SHOPPING_CART) ?? [];
		cart = cart.filter(flower => flower._id !== id);
		setStorage(Storage_Items.SHOPPING_CART, cart);
		setCart(cart);
	};

	return (
		<Container className="mt-5 d-flex">
			<Row className="w-100">
				<Col md={6} lg={5}>
					<Card elevation={3} style={{ borderRadius: "16px" }}>
						<CardContent>
							<Typography variant="h5" align="center" gutterBottom>
								🛒 Shopping Cart Login
							</Typography>

							<form onSubmit={handleSubmit(onSubmit)}>
								{renderInput(control, errors, "email", "Email", "email", {
									required: "Email is required",
								})}
								{renderInput(control, errors, "name", "Name", "text", {
									required: "Name is required",
									minLength: { value: 6, message: "At least 6 characters" },
								})}
								{renderInput(control, errors, "phone", "Phone", "tel", {
									required: "Phone is required",
									pattern: {
										value: /^[0-9]{10,15}$/,
										message: "Enter a valid phone number",
									},
								})}
								{renderInput(control, errors, "address", "Address", "text", {
									required: "Address is required",
									minLength: { value: 10, message: "At least 10 characters" },
								})}

								<Button
									fullWidth
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									style={{ borderRadius: "12px" }}
								>
									Submit
								</Button>
							</form>
						</CardContent>
					</Card>
				</Col>
			</Row>

			<ProductList
				cart={cart}
				removeProduct={removeFlowerFromCart} 
				onDecrease={(productId) => updateCount(productId, "dec")}
				onIncrease={(productId) => updateCount(productId, "inc")}
			/>
		</Container>
	);
};

export { ShoppingCart };
