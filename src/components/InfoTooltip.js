import Union from "../images/Union.png";

function InfoTooltip(props) {

    return (
        <section className={props.isOpened ? `popup popup_${props.name} popup_opened` : `popup popup_${props.name}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button type="button" className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
                <img className="popup__union" src={Union} />
                <p className="popup__information">Вы успешно зарегистрировались!</p>
            </div>
        </section>
    );
}

export default InfoTooltip;