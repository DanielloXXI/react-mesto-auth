function ImagePopup(props) {
    return (
        <section className={props.isOpened ? `popup popup_${props.name} popup_opened` : `popup popup_${props.name}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button popup__close-button_photo" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <h2 className="popup__text">{props.card.name}</h2>
            </div>
        </section>
    );
};

export default ImagePopup;