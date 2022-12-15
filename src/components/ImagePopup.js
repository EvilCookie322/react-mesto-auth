function ImagePopup(props) {
	return (
		props.card && (
			<div
				className={`popup popup_type_preview-picture${
					props.card ? " popup_opened" : ""
				}`}
			>
				<div className='popup__picture-container'>
					<img
						className='popup__image'
						src={props.card.link}
						alt={props.card.name}
					/>
					<h2 className='popup__name'>{props.card.name}</h2>
					<button
						onClick={props.onClose}
						type='button'
						className='button popup__close-button'
					></button>
				</div>
			</div>
		)
	);
}

export default ImagePopup;
