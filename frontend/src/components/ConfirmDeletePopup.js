import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup(props) {

function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
}

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title={'Вы уверенны?'}
            btnType={props.btnConfirm}
            name={'confirmation-delete'}>
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;