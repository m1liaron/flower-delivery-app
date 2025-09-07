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

type FormValues = {
	name: string;
	email: string;
	phone: number;
	address: string;
};

// Reusable field generator
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

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
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
		</Container>
	);
};

export { ShoppingCart };
