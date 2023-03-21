function ImagePopup(props) {
    return (
        <div className={`popup popup_view_photo ${props.isOpen._id && 'popup_opened'}`}>
            <div className="container-view-photo">
                <button className="popup__close  container-view-photo__button-close" type="button" aria-label="close" onClick={props.onClose}></button>
                <img src={props.isOpen.link} alt={props.isOpen.name} className="container-view-photo__photo" />
                <h3 className="container-view-photo__title">{props.isOpen.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;