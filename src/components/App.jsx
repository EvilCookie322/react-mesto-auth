import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { Api } from "../utils/Api";
import { authorization, registration, checkToken } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import InfoTooltip from "./InfoTooltip";

function App() {
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
	const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
	const [isAddplaceOpen, setIsAddPlaceOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [userEmail, setUserEmail] = useState("");
	const [cards, setCards] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [registrationSuccessData, setRegistrationSuccessData] = useState({
		status: false,
		message: "",
	});

	const history = useHistory();

	useEffect(() => {
		handleTokenCheck();
	});
	//Получение информации о пользователе
	useEffect(() => {
		if (loggedIn)
			Api.getUserInformation()
				.then((userInformation) => {
					if (userInformation) setCurrentUser(userInformation);
					else return Promise.reject(new Error("Sorry, we have problems"));
				})
				.catch((error) => console.error(error));
	}, [loggedIn]);
	//Получение карточек
	useEffect(() => {
		if (loggedIn)
			Api.getInitialCards()
				.then((cards) => {
					if (cards) setCards(cards);
					else return Promise.reject(new Error("Sorry, we have problems"));
				})
				.catch((error) => console.error(error));
	}, [loggedIn]);

	function handleCardLike(card, isLiked) {
		(isLiked ? Api.removeLike(card._id) : Api.setLike(card._id))
			.then((newCard) => {
				if (newCard)
					setCards((cards) =>
						cards.map((card) => (card._id === newCard._id ? newCard : card))
					);
				else return Promise.reject(new Error("Sorry, we have problems"));
			})
			.catch((error) => console.error(error));
	}

	function handleCardDelete(card, isOwn) {
		if (isOwn) {
			Api.deleteCard(card._id)
				.then((answer) => {
					if (answer)
						setCards((cards) => cards.filter((item) => item._id !== card._id));
					else return Promise.reject(new Error("Sorry, we have problems"));
				})
				.catch((error) => console.error(error));
		}
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleEditProfileClick() {
		setIsEditProfileOpen(true);
	}
	function handleEditAvatarClick() {
		setIsEditAvatarOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfileOpen(false);
		setIsEditAvatarOpen(false);
		setIsAddPlaceOpen(false);
		setIsConfirmDeleteOpen(false);
		setSelectedCard(null);
		setIsInfoTooltipOpen(false);
	}

	function handleAddPlaceClick() {
		setIsAddPlaceOpen(true);
	}

	function handleUpdateUser({ name, description }) {
		return Api.updateUserInformation(name, description)
			.then((userInformation) => {
				if (userInformation) {
					setCurrentUser(userInformation);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	function handleUpdateAvatar({ avatar }) {
		return Api.updateAvatar(avatar)
			.then((userInformation) => {
				if (userInformation) {
					setCurrentUser(userInformation);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	function handleAddPlace(placeInfo) {
		return Api.createCard(placeInfo)
			.then((newCard) => {
				if (newCard) {
					setCards([newCard, ...cards]);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	function handleTokenCheck() {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			checkToken(jwt)
				.then((res) => {
					setUserEmail(res.data.email);
					setLoggedIn(true);
					history.push("/");
				})
				.catch((error) => console.log(error));
		}
	}

	function handleSignOut() {
		localStorage.removeItem("jwt");
		setLoggedIn(false);
		setUserEmail("");
	}

	function handleRegistrationSubmit(formValues, setFormValues) {
		registration(formValues)
			.then(() => {
				setFormValues({ email: "", password: "" });
				setRegistrationSuccessData({
					...registrationSuccessData,
					status: true,
					message: "Вы успешно зарегестрировались!",
				});
				setIsInfoTooltipOpen(true);
				if (!isInfoTooltipOpen) history.push("/sign-in");
			})
			.catch((error) => {
				error.then((res) => {
					setRegistrationSuccessData({
						...registrationSuccessData,
						status: false,
						message: res.error,
					});
					console.log(res.error);
					setIsInfoTooltipOpen(true);
					history.push("/sign-up");
				});
			});
	}

	function handleLoginSubmit(formValues, setFormValues) {
		authorization(formValues)
			.then((result) => {
				if (result.token) {
					setFormValues({ email: "", password: "" });
					localStorage.setItem("jwt", result.token);
					setLoggedIn(true);
					history.push("/");
				}
			})
			.catch((error) =>
				error.then((res) => {
					setRegistrationSuccessData({
						...registrationSuccessData,
						status: false,
						message: res.message,
					});
					console.log(res.message);
					setIsInfoTooltipOpen(true);
				})
			);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page__container'>
				<Switch>
					<ProtectedRoute
						exact
						path='/'
						loggedIn={loggedIn}
						component={() => (
							<>
								<Header
									title='Выйти'
									userEmail={userEmail}
									linkTo='/sign-in'
									onSignOut={handleSignOut}
								/>
								<Main
									onEditProfileClick={handleEditProfileClick}
									onEditAvatarClick={handleEditAvatarClick}
									onAddPlaceClick={handleAddPlaceClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									onCardDelete={handleCardDelete}
									cards={cards}
								/>
							</>
						)}
					/>
					<Route path='/sign-in'>
						<Header title='Регистрация' linkTo='/sign-up' />
						<SignIn onSubmit={handleLoginSubmit} />
					</Route>
					<Route path='/sign-up'>
						<Header title='Войти' linkTo='/sign-in' />
						<SignUp onSubmit={handleRegistrationSubmit} />
					</Route>
				</Switch>
				<Footer />
			</div>

			<InfoTooltip
				isOpen={isInfoTooltipOpen}
				onClose={closeAllPopups}
				successData={registrationSuccessData}
			/>

			<EditProfilePopup
				isOpen={isEditProfileOpen}
				onUpdateUser={handleUpdateUser}
				onClose={closeAllPopups}
			/>

			<EditAvatarPopup
				isOpen={isEditAvatarOpen}
				onUpdateAvatar={handleUpdateAvatar}
				onClose={closeAllPopups}
			/>

			<AddPlacePopup
				isOpen={isAddplaceOpen}
				onAddPlace={handleAddPlace}
				onClose={closeAllPopups}
			/>
			{/* TODO: написать функциональность подтверждения удаления */}
			<PopupWithForm
				title='Вы уверены?'
				name='confirm-delete'
				isOpen={isConfirmDeleteOpen}
				onClose={closeAllPopups}
			>
				<button type='submit' className='button form__confirm-button'>
					Да
				</button>
			</PopupWithForm>

			<ImagePopup onClose={closeAllPopups} card={selectedCard} />
		</CurrentUserContext.Provider>
	);
}

export default App;
