class Api {
	#url;
	#headers;

	constructor(data) {
		this.#url = data.url;
		this.#headers = data.headers;
	}

	response(fetch) {
		return fetch()
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				return Promise.reject(new Error(response.status));
			})
			.catch((error) => {
				console.log("Error while sending request", error);
				return false;
			});
	}

	getInitialCards() {
		return this.response(() => {
			return fetch(`${this.#url}/cards`, { headers: this.#headers });
		});
	}

	getUserInformation() {
		return this.response(() => {
			return fetch(`${this.#url}/users/me`, { headers: this.#headers });
		});
	}

	updateUserInformation(name, about) {
		return this.response(() => {
			return fetch(`${this.#url}/users/me`, {
				method: "PATCH",
				headers: this.#headers,
				body: JSON.stringify({
					name: name,
					about: about,
				}),
			});
		});
	}

	createCard({ name, link }) {
		return this.response(() => {
			return fetch(`${this.#url}/cards`, {
				method: "POST",
				headers: this.#headers,
				body: JSON.stringify({
					name: name,
					link: link,
				}),
			});
		});
	}

	deleteCard(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}`, {
				method: "DELETE",
				headers: this.#headers,
			});
		});
	}

	setLike(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}/likes`, {
				method: "PUT",
				headers: this.#headers,
			});
		});
	}

	removeLike(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}/likes`, {
				method: "DELETE",
				headers: this.#headers,
			});
		});
	}

	updateAvatar(link) {
		return this.response(() => {
			return fetch(`${this.#url}/users/me/avatar`, {
				method: "PATCH",
				headers: this.#headers,
				body: JSON.stringify({
					avatar: link,
				}),
			});
		});
	}
}

const API = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-52",

	headers: {
		authorization: "ed068a2f-c117-42a5-a232-1e0db66110be",
		"Content-Type": "application/json",
	},
});

export { API as Api };
