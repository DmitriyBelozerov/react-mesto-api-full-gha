const apiOptions = {
    baseUrl: "https://api.domainname.students.nomoredomainsclub.ru",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },

}

class Api {
    constructor(config) {
        this._header = config.headers;
        this._baseUrl = config.baseUrl;
    }

    _getJsonOrError(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Ошибка при загрузке данных с сервера')
    }

    register(newEmail, newPassword) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: `${newPassword}`,
                email: `${newEmail}`
            }),
        })
            .then(this._getJsonOrError)
    }

    logIn(emailIn, passwordIn) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: `${passwordIn}`,
                email: `${emailIn}`
            }),
        })
            .then(this._getJsonOrError)
    }

    logOut() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(this._getJsonOrError)
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(this._getJsonOrError)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    setUserInfo(newName, newAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._header,
            body: JSON.stringify({
                name: `${newName}`,
                about: `${newAbout}`
            }),
        })
            .then(this._getJsonOrError)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    createNewCard(newName, newLink) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._header,
            body: JSON.stringify({
                name: `${newName}`,
                link: `${newLink}`
            }),
        })
            .then(this._getJsonOrError)
    }



    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                credentials: 'include',
                headers: this._header,
            })
                .then(this._getJsonOrError)
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                credentials: 'include',
                headers: this._header,
            })
                .then(this._getJsonOrError)
        }
    }

    submitAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._header,
            body: JSON.stringify({
                avatar: `${link}`
            }),
        })
            .then(this._getJsonOrError)
    }
}


const api = new Api(apiOptions);

export default api;