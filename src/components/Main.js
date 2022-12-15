import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__photo-container'>
					<button
						onClick={props.onEditAvatarClick}
						type='button'
						className='profile__edit-avatar-button'
					></button>
					<img
						src={currentUser.avatar}
						alt='Аватар'
						className='profile__photo'
					/>
				</div>
				<div className='profile__info'>
					<h1 className='profile__name'>{currentUser.name}</h1>
					<button
						onClick={props.onEditProfileClick}
						type='button'
						className='button profile__edit-button'
					></button>
					<p className='profile__description'>{currentUser.about}</p>
				</div>
				<button
					onClick={props.onAddPlaceClick}
					type='submit'
					className='button profile__add-button'
				></button>
			</section>

			<ul className='elements'>
				{props.cards.map((card) => (
					<Card
						card={card}
						onCardLike={props.onCardLike}
						onCardClick={props.onCardClick}
						onCardDelete={props.onCardDelete}
						key={card._id}
					/>
				))}
			</ul>
		</main>
	);
}

export default Main;
