import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={props.title}
            logo={<img src={props.logo} alt='лого' className='form__logo'/>}
            name={'InfoTooltip'}>
        </PopupWithForm>
    )
}

export default InfoTooltip;