import { useState, useEffect, ChangeEvent } from "react";
import { useUserDataMutate } from "../../hooks/createUserData";
import { FaPlus } from "react-icons/fa";
import './modal.css';
import { UserDataRequest } from "../../interface/UserDataRequest";
import useUpdateData from "../../hooks/updateUserData";
import moment from "moment";
import "moment/locale/pt-br";


interface InputProps {
    label: string,
    value: string,
    updateValue(value: any): void
}

interface InputDateProps {
    label: string;
    value: Date;
    updateValue(value: any): void;
}

interface InputFileProps {
    label: string,
    value: File | null;
    updateValue: (file: File | null) => void;
}

interface ModalProps {
    closeModal(): void
    isCreating: boolean
    data?: UserDataRequest
    cdUser?: number
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label className="label">{label}</label>
            <input className="input" type="text" value={value} onChange={e => updateValue(e.target.value)}></input>
        </>
    )
}

const InputDate = ({ label, value, updateValue }: InputDateProps) => {

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = moment(event.target.value, 'YYYY-MM-DD').toDate();

        updateValue(selectedDate);
    };

    useEffect(() => {
        const input = document.getElementById("date-input") as HTMLInputElement;
        if (input) {
            input.addEventListener("keydown", preventManualInput);
            return () => {
                input.removeEventListener("keydown", preventManualInput);
            };
        }
    }, []);

    const currentDate = new Date().toISOString().split("T")[0];

    const formattedDate = value instanceof Date ? moment(value).format('YYYY-MM-DD') : value;
    const preventManualInput = (event: KeyboardEvent) => {
        event.preventDefault();
    };

    return (
        <div className="input-date">
            <label>{label}</label>
            <input
                id="date-input"
                type="date"
                value={formattedDate}
                onChange={handleInputChange}
                className="disabled"
                max={currentDate}
            />
        </div>
    );
};

const InputFile = ({ label, value, updateValue }: InputFileProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files ? event.target.files[0] : null;
        if (file) {
            updateValue(file);
        }
    };

    return (
        <div className="input-file">
            <div className="input-label">
                <div className="image-container">
                    {value ? (
                        <img
                            className="selected-image"
                            src={typeof value === "string" ? value : URL.createObjectURL(value)}
                            alt="Imagem selecionada"
                        />
                    ) : (
                        <img
                            className="selected-image"
                            src="https://thiagobuckets3.s3.eu-north-1.amazonaws.com/not-found.jpg"
                            alt="Imagem não encontrada"
                        />
                    )}
                </div>
            </div>
            <div className="input-actions">
                <label htmlFor="arquivo" className="label-file">
                    {label}
                </label>
                <input
                    id="arquivo"
                    type="file"
                    accept="image/*"
                    className="input"
                    onChange={handleInputChange}
                />
            </div>
        </div>

    );
};

export function CreateModal({ closeModal, isCreating, data, cdUser }: ModalProps) {

    const [name, setName] = useState(data?.name ? data.name : "");
    const [image, setImage] = useState<any>(data?.image ? data.image : null);
    const [birthday, setBirthday] = useState(data?.birthday ? moment(data.birthday).toDate() : moment().toDate());
    const { mutate } = useUserDataMutate();
    const updateMutation = useUpdateData();

    const submit = () => {
        const userData: UserDataRequest = {
            name,
            birthday: moment(birthday).toDate(),
            image
        };

        mutate(userData);
        closeModal();
    }

    const update = () => {
        if(!cdUser) return;
        try {
            updateMutation(image, name, moment(birthday).toDate(), cdUser); 
            closeModal();
        } catch {
            return;
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="modal-header">
                    <div className="title">
                        <h2>Cadastro de usuário:</h2>
                    </div>
                    <div className="btn-cancel">
                        <button onClick={closeModal} className="btn-close" >
                            <div className="icon-remove">
                                <FaPlus />
                            </div>
                        </button>
                    </div>
                </div>
                <form className="input-container">
                    <InputFile label="Selecionar imagem" value={image} updateValue={setImage} />
                    <Input label="Nome:" value={name} updateValue={setName} />
                    <InputDate label="Data de nascimento:" value={birthday} updateValue={setBirthday} />
                </form>
                <div className="btn-post">
                    <button onClick={isCreating ? submit : update} className="btn-secondary">
                        POSTAR
                    </button>
                </div>
            </div>
        </div>
    );
}