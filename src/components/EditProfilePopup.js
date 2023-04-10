import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name={"edit"} title={"Редактировать профиль"} isOpened={props.isOpen} onClose={props.onClose} buttonText={props.buttonText} onSubmit={handleSubmit}>
      <label className="popup__fieldset">
        <input type="text" name="name" className="popup__input popup__input_edit_name" id="name" minLength="2"
          maxLength="40" required placeholder='Имя' value={name || ''} onChange={handleChangeName} />
        <span className="popup__input-error name-error"></span>
      </label>
      <label className="popup__fieldset">
        <input type="text" name="description" className="popup__input popup__input_edit_description"
          id="description" minLength="2" maxLength="200" required placeholder='Занятие' value={description || ''} onChange={handleChangeDescription} />
        <span className="popup__input-error description-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;