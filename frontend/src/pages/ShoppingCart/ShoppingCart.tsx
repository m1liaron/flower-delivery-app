import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
	type Control,
	Controller,
	type FieldErrors,
	useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Storage_Items } from "../../common/enums";
import type { Flower } from "../../common/types";
import { axiosInstance } from "../../helpers/axiosInstance";
import { getStorage, setStorage } from "../../storage/localStorage";
import { ProductList } from "../Home/components/ProductsList";

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
	const navigate = useNavigate();

	useEffect(() => {
		const storedCart = getStorage<Flower[]>(Storage_Items.SHOPPING_CART) ?? [];
		setCart(storedCart);
	}, []);

	const onSubmit = async (data: FormValues) => {
		const orderData = {
			...data,
			total: cart.reduce((a, b) => a + b.price, 0),
			date: new Date().toLocaleDateString(),
			products: cart.map((product) => {
				return {
					_id: product._id,
					title: product.title,
					count: product.count,
				};
			}),
		};

		try {
			const res = await axiosInstance.post("/orders", orderData);
			localStorage.clear();
			toast.success(`Success, your order id: ${res.data._id}`);
			navigate(`/order/${res.data._id}`);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				toast.error(error.message);
			}
		}
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
		cart = cart.filter((flower) => flower._id !== id);
		setStorage(Storage_Items.SHOPPING_CART, cart);
		setCart(cart);
	};

	return (
		<Container className="mt-5 d-flex">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
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
