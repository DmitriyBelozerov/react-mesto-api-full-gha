import React from "react";
import { TranslationContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(TranslationContext);

    const isOwn = card.owner === currentUser._id || card.owner._id === currentUser._id;
   
    
    const cardDeleteButtonClassName = (`card__delete ${!isOwn && 'card__delete_hidden'}`);

    const isLiked = card.likes.some(i => i._id === currentUser._id);
   
    const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <img alt={card.name} className="card__photo" src={card.link} onClick={handleClick} />
            <h2 className="card__title">{card.name}</h2>
            <div className="card__like-section">
                <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button>
                <span className="card__like-users">{card.likes.length}</span>
            </div>
            <button className={cardDeleteButtonClassName} type="button" aria-label="delete" onClick={handleDeleteClick}></button>
        </li>
    )
}

export default Card;