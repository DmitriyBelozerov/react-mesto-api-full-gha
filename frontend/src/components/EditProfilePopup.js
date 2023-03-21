import React from "react";
import PopupWithForm from "./PopupWithForm";
import { TranslationContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(TranslationContext);

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
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title={'Редактировать профиль'}
            btnType={'Сохранить'}
            name={'change-profile'}>
            <input id="name" className="form__input form__input_type_name" type="text" value={name || ''} onChange={handleChangeName}
                name="inputName" placeholder="Имя" minLength="2" maxLength="40" required />
            <span id="error-name" className="form__error-message form__error-message_hiden"></span>
            <input id="profession" className="form__input form__input_type_about" type="text" value={description || ''} onChange={handleChangeDescription}
                name="inputAbout" placeholder="Профессия" minLength="2" maxLength="200" required />
            <span id="error-profession" className="form__error-message form__error-message_hiden"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;