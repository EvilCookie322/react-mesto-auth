import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
	const currentUser = useContext(CurrentUserContext);

	const isOwn = currentUser._id === props.card.owner._id;
	const isLiked = props.card.likes.some((like) => like._id === currentUser._id);

	function handleCardClick() {
		props.onCardClick(props.card);
	}

	function handleCardLike() {
		props.onCardLike(props.card, isLiked);
	}

	function handleCardDelete() {
		props.onCardDelete(props.card, isOwn);
	}

	return (
		<li className='element'>
			<img
				onClick={handleCardClick}
				src={props.card.link}
				alt={props.card.name}
				className='element__image'
			/>
			<h2 className='element__name'>{props.card.name}</h2>
			<div className='element__like-container'>
				<button
					type='button'
					onClick={handleCardLike}
					className={`button element__button-like${
						isLiked ? " element__button-like_active" : ""
					}`}
				></button>
				<p className='element__like-count'>{props.card.likes.length}</p>
			</div>
			<button
				onClick={handleCardDelete}
				style={isOwn ? { display: "block" } : { display: "none" }}
				type='button'
				className='button element__button-trash'
			></button>
		</li>
	);
}

export default Card;
