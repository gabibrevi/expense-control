import { useState, useEffect } from "react";
import closeModal from "../img/cerrar.svg";
import Alert from "./Alert";

const Modal = ({
    setModal,
    popUpModal,
    setPopUpModal,
    getSpendingObj,
    editSpending,
}) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (Object.keys(editSpending).length > 0) {
            setName(editSpending.name);
            setAmount(editSpending.amount);
            setCategory(editSpending.category);
            setDate(editSpending.date);
            setId(editSpending.id);
        }
    }, []);

    const handleSpendingForm = (e) => {
        e.preventDefault();

        if ([name, amount, category].includes("")) {
            setMessage("Complete all options");
            return;
        }
        //Saving or Editiing spending object
        getSpendingObj({ name, amount, category, date, id });
        setName("");
        setAmount("");
        setCategory("");
    };

    setTimeout(() => {
        setMessage("");
    }, 1000);

    const hideModal = () => {
        setPopUpModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={closeModal} alt="Close modal" onClick={hideModal} />
            </div>
            <form
                className={`formulario ${popUpModal ? "animar" : "cerrar"} `}
                onSubmit={handleSpendingForm}>
                <legend>
                    {!editSpending.name ? "Add spending " : "Edit spending"}
                </legend>
                {message && <Alert type="error">{message}</Alert>}

                <div className="campo">
                    <label htmlFor="Spending">Spending</label>
                    <input
                        type="text"
                        id="spending"
                        placeholder="Type what you spent in"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cant">$</label>
                    <input
                        type="number"
                        id="cant"
                        placeholder="Type the amount spent"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value=""> -- Choose --</option>
                        <option value="saving">Saving</option>
                        <option value="groceries">Groceries</option>
                        <option value="rent">Rent</option>
                        <option value="car">Car</option>
                        <option value="dinner">Dinner</option>
                        <option value="health">Health</option>
                        <option value="suscriptions">Suscriptions</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={!editSpending.name ? "Add " : "Edit"}
                />
            </form>
        </div>
    );
};

export default Modal;
