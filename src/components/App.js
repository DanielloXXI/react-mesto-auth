import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Routes, useNavigate, Navigate } from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import apiAuth from "../utils/Api-auth";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState("");
  const [isGoodAuth, setIsGoodAuth] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [])

  React.useEffect(() => {
    Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }, []);

  function handleUpdateUser(props) {
    setIsLoading(true);
    api.setInfoAboutUser(props.name, props.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleRegistrationUser(props) {
    apiAuth.signUp(props.password, props.email)
      .then((response) => {
        try {
          if (response.status === 200) {
            return response.json();
          }
        } catch (e) {
          return (e)
        }
      })
      .then((res) => {
        setIsInfoTooltipOpen(true);
        navigate('/sign-in', { replace: true });
        setIsGoodAuth(true);
      })
      .catch((err) => {
        setIsGoodAuth(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      })
  }

  function handleLoginUser(props) {
    apiAuth.signIn(props.password, props.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          setIsEmail(props.email);
          props.setFormValue({ username: '', password: '' });
          navigate('/users/me', { replace: true });
          return data;
        }
      })
      .catch((err) => {
        setIsGoodAuth(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      })
  }

  function handleUpdateAvatar(props) {
    setIsLoading(true);
    api.setAvatar(props.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(props) {
    setIsLoading(true);
    api.addUserCard(props.name, props.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setIsSelectedCard(card);
  }

  function showPopupEdit() {
    setIsEditProfilePopupOpen(true);
  }

  function showPopupAdd() {
    setIsAddPlacePopupOpen(true);
  }

  function showPopupAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
    } else {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then((res) => {
        // setCards(cards.filter(c => c._id !== card._id));
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function goRegistration() {
    navigate(`/sign-up`, { replace: true });
  }

  function goExit() {
    setIsLoggedIn(false);
    localStorage.removeItem(`jwt`);
    navigate(`/`, { replace: true });
  }

  function goEnter() {
    navigate(`/sign-in`, { replace: true });
  }

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        // проверим токен
        apiAuth.tokenValidity(jwt)
          .then((res) => {
            if (res) {
              // авторизуем пользователя
              setIsLoggedIn(true);
              setIsEmail(res.data.email);
              navigate("/users/me", { replace: true })
            }
            return res;
          })
          .catch((err) => console.log(err));
      }
      // здесь будем проверять токен
    }
  }

  return (
    <CardContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} toEnter={goEnter} toRegistration={goRegistration} toExit={goExit} email={isEmail} />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Main} isLoggedIn={isLoggedIn} />} />
          <Route path="/sign-up" element={<SignUp onRegistrationUser={handleRegistrationUser} />} />
          <Route path="/sign-in" element={<SignIn onAuthUser={handleLoginUser} />} />
          <Route path="/users/me" element={<ProtectedRoute element={Main} isLoggedIn={isLoggedIn} onEditAvatar={showPopupAvatar} onEditProfile={showPopupEdit} onAddPlace={showPopupAdd} onImagePopup={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
        </Routes>

        <InfoTooltip isOpened={isInfoTooltipOpen} onClose={closeAllPopups} isGoodAuth={isGoodAuth} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonText={isLoading ? 'Создание...' : 'Создать'} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} />

        <ImagePopup name={"photo"} card={selectedCard} onClose={closeAllPopups} isOpened={isImagePopupOpen} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} />

        <PopupWithForm name={"delete"} title={"Вы уверены?"} buttonText={isLoading ? "Удаление..." : "Да"} />

      </CurrentUserContext.Provider>
    </CardContext.Provider>
  );
}

export default App;
