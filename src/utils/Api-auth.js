class ApiAuth {
    constructor(options) {
        this._url = options.baseUrl;
    }

    tokenValidity(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(handleResponse)
    }

    signUp(password, email, setIsGoodAuth, isGoodAuth) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(new Error("Произошла ошибка"));
        })
    }

    signIn(password, email) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(handleResponse)
    }

}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(new Error("Произошла ошибка"));
}

const apiAuth = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co',
});

export default apiAuth;