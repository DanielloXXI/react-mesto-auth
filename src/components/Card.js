import trash from "../images/trash.svg";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    const currentUser = React.useContext(CurrentUserContext);


    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-icon ${isLiked && 'element__like-icon_active'}`
    );

    return (
        <div className="element">
            {isOwn && <img src={trash} className="element__delete" alt="удалить" onClick={handleDeleteClick} />}
            <img src={props.card.link} onClick={handleClick} alt={props.name} className="element__image" />
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;