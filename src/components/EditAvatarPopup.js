import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";

function EditAvatarPopup(props) {
	const avatar = useRef();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (props.isOpen) {
			avatar.current.value = "";
		}
	}, [props.isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		props
			.onUpdateAvatar({ avatar: avatar.current.value })
			.finally(() => setIsLoading(false));
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='edit-avatar'
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			onClose={props.onClose}
		>
			<label className='form__field'>
				<input
					type='url'
					className='form__input'
					id='link-input-avatar'
					name='link'
					ref={avatar}
					placeholder='Ссылка на картинку'
					required
				/>
				<span className='form__error link-input-avatar-error'></span>
			</label>
			<button type='submit' className='button form__submit-button'>
				{isLoading ? "Сохранение..." : "Сохранить"}
			</button>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
