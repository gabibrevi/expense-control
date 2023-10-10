import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetControl = ({
    budget,
    setBudget,
    spendingList,
    setSpendingList,
    setIsValidBudget,
}) => {
    const [porcentage, setPorcentage] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [spent, setSpent] = useState(0);

    const formatCurrency = (budget) => {
        return budget.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const handleResetApp = () => {
        const result = confirm("Do you want to reset the spending?");

        if (result) {
            setBudget(0);
            setSpendingList([]);
            setIsValidBudget(false);
        }
    };

    useEffect(() => {
        const totalSpent = spendingList.reduce(
            (total, spending) => parseInt(spending.amount) + total,
            0
        );

        const totalDisponible = budget - totalSpent;
        const porcentageCalc = (
            ((budget - totalDisponible) / budget) *
            100
        ).toFixed(2);

        setSpent(totalSpent);
        setDisponible(budget - totalSpent);

        setTimeout(() => {
            setPorcentage(porcentageCalc);
        }, 700);
    }, [spendingList]);

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentage > 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#F5F5F5",
                        textColor: porcentage > 100 ? "#DC2626" : "#3B82F6",
                    })}
                    value={porcentage}
                    text={`${porcentage}% spent`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}>
                    Reset
                </button>
                <p>
                    <span>Budget: </span>
                    {formatCurrency(budget)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Available: </span>
                    {formatCurrency(disponible)}
                </p>
                <p>
                    <span>Spent: </span>
                    {formatCurrency(spent)}
                </p>
            </div>
        </div>
    );
};

export default BudgetControl;
