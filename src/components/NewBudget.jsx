import { useState } from "react";
import Alert from "./Alert";

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
    const [message, setMessage] = useState("");

    const handleBudget = (e) => {
        e.preventDefault();

        if (!budget || budget < 0) {
            setMessage("Type budget");
            setIsValidBudget(false);
            return;
        }
        setMessage("");
        setIsValidBudget(true);
    };

    return (
        <div className="contenedor-presupuesto  contenedor sombra">
            <form onSubmit={handleBudget} className="formulario">
                <div className="campo">
                    <label htmlFor="">Budget</label>
                    <input
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Add your budget"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Add" />
                {message && <Alert type="error">{message}</Alert>}
            </form>
        </div>
    );
};

export default NewBudget;
