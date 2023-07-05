import { useState } from 'react'
import moment from "moment";
import "./card.css"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { CreateModal } from "../Create-Modal/create-modal";
import { UserDataRequest } from '../../interface/UserDataRequest';

interface CardProps {
    birthday: Date,
    name: string,
    image: string,
    cdUser: number,
    onDelete: () => void;
}

export function Card({ onDelete, birthday, image, name, cdUser }: CardProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData: UserDataRequest = {
        name,
        birthday,
        image
    };

    const handleOpenModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(prev => !prev);
        }
    }
    const handleCloseModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <div className="card">
            <div className="image-conteiner-total">
                <div className="image-container">
                    <img className="selected-image" src={image} />
                </div>
            </div>
            <div className="info-container">
                <div className="info">
                    <h2 className="name">{name}</h2>
                    <p><b className="birthday">{moment(birthday).format('DD/MM/YYYY')}</b></p>
                </div>
                <div className="tools-group">
                    <button onClick={handleOpenModal} className="update-button" >
                        <div className="update-icon">
                            <FaEdit />
                        </div>
                    </button>
                    {isModalOpen && <CreateModal data={userData} closeModal={handleCloseModal} cdUser={cdUser} isCreating={false} />}
                    <button onClick={onDelete} className="delete-button" >
                        <div className="delete-icon">
                            <FaTrashAlt />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}