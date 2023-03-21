import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [cardLink, setCardSrc] = React.useState('');
    const [cardTitle, setCardTitle] = React.useState('');

    React.useEffect(() => {
        setCardTitle('');
        setCardSrc('');
    }, [props.isOpen]);


    function handleChangeLink(e) {
        setCardSrc(e.target.value);
    }

    function handleChangeTitle(e) {
        setCardTitle(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPhotoCard({
            link: cardLink,
            title: cardTitle
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleAddPlaceSubmit}
            title={'Новое место'}
            btnType={'Создать'}
            name={'add-place'} >
            <input id="photo-name" className="form__input form__input_add_photo" type="text"
                value={cardTitle} onChange={handleChangeTitle} name="inputPhotoName"
                placeholder="Название" minLength="2" maxLength="30" required />
            <span id="error-photo-name" className="form__error-message form__error-message_hiden"></span>
            <input id="photo-url" className="form__input form__input_add_url" type="url"
                value={cardLink} onChange={handleChangeLink} name="inputPhotoUrl"
                placeholder="Ссылка" required />
            <span id="error-photo-url" className="form__error-message form__error-message_hiden"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;