import { useState } from "react";

function SignIn({ onSubmit }) {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit(formValues, setFormValues);
	}
	return (
		<main className='sign-up'>
			<h2 className='sign-up__title'>Вход</h2>
			<form
				onSubmit={handleSubmit}
				name='sign-in'
				className='form form_type_sign-in'
			>
				<input
					type='email'
					className='form__input form__input_place_sign-up'
					name='email'
					id='email'
					placeholder='Email'
					value={formValues.email}
					onChange={handleChange}
					required
				></input>
				<input
					type='password'
					className='form__input form__input_place_sign-up'
					name='password'
					placeholder='Password'
					value={formValues.password}
					onChange={handleChange}
					required
				></input>
				<button
					type='submit'
					className='button form__submit-button form__submit-button_place_sign-up'
				>
					Войти
				</button>
			</form>
		</main>
	);
}

export default SignIn;
