function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_type_${props.name}${
				props.isOpen ? " popup_opened" : ""
			}`}
		>
			<div className='popup__container'>
				<h2 className='popup__heading'>{props.title}</h2>
				<form
					onSubmit={props.onSubmit}
					name={`${props.name}-form`}
					className={`form form_type_${props.name}`}
				>
					{props.children}
				</form>
				<button
					onClick={props.onClose}
					type='reset'
					className='button popup__close-button'
				></button>
			</div>
		</div>
	);
}

export default PopupWithForm;
