import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };

    return (
        <PopupWithForm name={"avatar"} title={"Обновить аватар"} isOpened={props.isOpen} onClose={props.onClose} buttonText={props.buttonText} onSubmit={handleSubmit}>
            <label className="popup__fieldset">
                <input type="url" name="image" className="popup__input popup__input_avatar_name" id="image" required
                    placeholder="Ссылка на аватар" ref={avatarRef} />
                <span className="popup__input-error image-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;