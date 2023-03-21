import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title={'Обновить аватар'}
            btnType={'Сохранить'}
            name={'submit-avatar'}      >
            <input id="avatar-url" className="form__input form__input_submit-avatar" type="url" ref={avatarRef}
                name="avatar" placeholder="Ссылка" required />
            <span id="error-avatar-url" className="form__error-message form__error-message_hiden"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;