import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp({ onSubmit }) {
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
			<h2 className='sign-up__title'>Регистрация</h2>
			<form
				onSubmit={handleSubmit}
				name='sign-up'
				className='form form_type_sign-up'
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
					Регистрация
				</button>
			</form>
			<p className='sign-up__suggestion'>
				Уже зарегистрированы?{" "}
				<Link to='/sign-in' className='sign-up__link'>
					Войти
				</Link>
			</p>
		</main>
	);
}

export default SignUp;
