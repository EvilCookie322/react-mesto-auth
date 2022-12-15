import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		if (props.isOpen) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [currentUser, props.isOpen]);

	function handleChange(e) {
		if (e.target.name === "name") {
			setName(e.target.value);
		} else {
			setDescription(e.target.value);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		props
			.onUpdateUser({
				name,
				description,
			})
			.then(() => setIsLoading(false));
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='edit-profile'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className='form__field'>
				<input
					type='text'
					className='form__input'
					id='name-input'
					name='name'
					value={name}
					onChange={handleChange}
					minLength='2'
					maxLength='40'
					required
				/>
				<span className='form__error name-input-error'></span>
			</label>
			<label className='form__field'>
				<input
					type='text'
					className='form__input'
					id='description-input'
					name='description'
					value={description}
					onChange={handleChange}
					minLength='2'
					maxLength='200'
					required
				/>
				<span className='form__error description-input-error'></span>
			</label>
			<button type='submit' className='button form__submit-button'>
				{isLoading ? "Сохранение..." : "Сохранить"}
			</button>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
