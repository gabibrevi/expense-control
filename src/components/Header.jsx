import NewBudget from "./newBudget";
import BudgetControl from "./BudgetControl";

const header = ({
    budget,
    setBudget,
    isValidBudget,
    setIsValidBudget,
    spendingList,
    setSpendingList,
}) => {
    return (
        <header>
            <h1>Expense Control</h1>

            {isValidBudget ? (
                <BudgetControl
                    budget={budget}
                    setBudget={setBudget}
                    spendingList={spendingList}
                    setSpendingList={setSpendingList}
                    setIsValidBudget={setIsValidBudget}
                />
            ) : (
                <NewBudget
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
            )}
        </header>
    );
};

export default header;
