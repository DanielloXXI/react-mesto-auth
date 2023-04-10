function PopupWithForm(props) {
    return (
        <section className={props.isOpened ? `popup popup_${props.name} popup_opened` : `popup popup_${props.name}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button type="button" className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup__form_${props.name}`} name={`popup__form_${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__submit-button">{props.buttonText}</button>
                </form>
            </div>
        </section>
    );
};

export default PopupWithForm;