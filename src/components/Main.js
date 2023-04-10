import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CardContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__status">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card card={card} onCardClick={props.onImagePopup} key={card._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    );
};

export default Main;