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
import { AddressAutocomplete } from "./components/AddressAutocomplete";
import DeliveryOSMMap from "./components/Map";

export type FormValues = {
	name: string;
	email: string;
	phone: number;
	address: string;
	lat?: number;
	lng?: number;
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
		setValue,
		watch,
	} = useForm<FormValues>();
	const [cart, setCart] = useState<Flower[]>([]);
	const [_mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
	const navigate = useNavigate();

	useEffect(() => {
		const storedCart = getStorage<Flower[]>(Storage_Items.SHOPPING_CART) ?? [];
		setCart(storedCart);
	}, []);

	const shop = { lat: 50.4501, lng: 30.5234, name: "Flower Shop Kyiv" };

	const user = {
		lat: watch("lat") ?? 0,
		lng: watch("lng") ?? 0,
		address: watch("address") ?? "",
	};

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
		<Container className="mt-5">
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
								🛒 Shopping Cart
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
								})}

								<Controller
									name="address"
									control={control}
									rules={{ required: "Address is required" }}
									render={({ field: { onChange, value } }) => (
										<>
											<AddressAutocomplete
												value={value}
												onChange={onChange}
												onSelect={({ lat, lng, display_name }) => {
													setMapCenter({ lat, lng });
													setValue("lat", lat);
													setValue("lng", lng);
													setValue("address", display_name);
													onChange(display_name);
												}}
											/>
											<DeliveryOSMMap
												shop={shop}
												user={user.lat && user.lng ? user : undefined}
												onUserSelect={({ lat, lng, address }) => {
													setMapCenter({ lat, lng });
													setValue("lat", lat);
													setValue("lng", lng);
													if (address) setValue("address", address);
												}}
											/>
										</>
									)}
								/>

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
				onDecrease={(id) => updateCount(id, "dec")}
				onIncrease={(id) => updateCount(id, "inc")}
			/>
		</Container>
	);
};

export { ShoppingCart };
