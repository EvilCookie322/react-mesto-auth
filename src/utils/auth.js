const BASE_URl = "https://auth.nomoreparties.co";

const registration = ({ email, password }) => {
	return fetch(`${BASE_URl}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).then((response) => {
		return response.ok ? response.json() : Promise.reject(response.json());
	});
};

const authorization = ({ email, password }) => {
	return fetch(`${BASE_URl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	}).then((response) => {
		return response.ok ? response.json() : Promise.reject(response.json());
	});
};
const checkToken = (token) => {
	return fetch(`${BASE_URl}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((response) => {
		return response.ok
			? response.json()
			: Promise.reject(
					new Error("Ошибка проверки токена. Код ошибки:", response.status)
			  );
	});
};

export { registration, authorization, checkToken };
