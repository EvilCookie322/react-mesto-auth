import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";

function AddPlacePopup(props) {
	const placeName = useRef();
	const placeLink = useRef();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		placeName.current.focus();
	});

	useEffect(() => {
		if (props.isOpen) {
			placeName.current.value = "";
			placeLink.current.value = "";
		}
	}, [props.isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		props
			.onAddPlace({
				name: placeName.current.value,
				link: placeLink.current.value,
			})
			.finally(() => setIsLoading(false));
	}
	return (
		<PopupWithForm
			title='Новое место'
			name='add-card'
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			onClose={props.onClose}
		>
			<label className='form__field'>
				<input
					type='text'
					className='form__input'
					id='place-name-input'
					name='name'
					ref={placeName}
					placeholder='Название'
					minLength='2'
					maxLength='30'
					required
				/>
				<span className='form__error place-name-input-error'></span>
			</label>
			<label className='form__field'>
				<input
					type='url'
					className='form__input'
					id='link-input'
					name='link'
					ref={placeLink}
					placeholder='Ссылка на картинку'
					required
				/>
				<span className='form__error link-input-error'></span>
			</label>
			<button type='submit' className='button form__submit-button'>
				{isLoading ? "Сохранение..." : "Сохранить"}
			</button>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
