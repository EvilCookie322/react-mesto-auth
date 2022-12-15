function InfoTooltip({ isOpen, onClose, successData: { status, message } }) {
	return (
		<div className={`popup ${isOpen ? " popup_opened" : ""}`}>
			<div className='popup__container'>
				<div
					className={`sign-up__icon sign-up__icon_${
						status ? "success" : "unsuccess"
					}`}
				></div>
				<p className='sign-up__text'>{message}</p>
				<button
					onClick={onClose}
					type='reset'
					className='button popup__close-button'
				></button>
			</div>
		</div>
	);
}

export default InfoTooltip;
