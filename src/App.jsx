import { useState, useEffect } from "react";
import Header from "./components/header";
import IconNewSpent from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import SpendingList from "./components/SpendingList";
import { createID } from "./helpers/index.js";
import Filter from "./components/Filter";

function App() {
    //check for budget in localStorage and if it does not exist begins as 0
    const [budget, setBudget] = useState(
        Number(localStorage.getItem("budget") ?? 0)
    );
    const [isValidBudget, setIsValidBudget] = useState(false);

    const [modal, setModal] = useState(false);
    const [popUpModal, setPopUpModal] = useState(false);

    const [spendingList, setSpendingList] = useState(
        localStorage.getItem("spendingList")
            ? JSON.parse(localStorage.getItem("spendingList"))
            : []
    );
    const [editSpending, setEditSpending] = useState({});

    const [filter, setFilter] = useState("");
    const [filterSpending, setFilterSpending] = useState([]);

    /* LOCAL STORAGE */
    // Saving budget
    useEffect(() => {
        localStorage.setItem("budget", budget ?? 0);
    }, [budget]);

    //Saving spending list
    useEffect(() => {
        localStorage.setItem(
            "spendingList",
            JSON.stringify(spendingList) ?? []
        );
    }, [spendingList]);

    // Checking budget if it exists to jump into Budget Control
    useEffect(() => {
        const budgetLocalStorage = localStorage.getItem("budget") ?? 0;
        if (budgetLocalStorage > 0) {
            setIsValidBudget(true);
        }
    }, []);

    //Load data onto Form in modal
    useEffect(() => {
        if (Object.keys(editSpending).length > 0) {
            setModal(true);
            setTimeout(() => {
                setPopUpModal(true);
            }, 500);
        }
    }, [editSpending]);

    //FIlter
    useEffect(() => {
        if (filter) {
            const filterSpending = spendingList.filter(
                (spending) => spending.category === filter
            );
            setFilterSpending(filterSpending);
        }
    }, [filter]);

    const deleteSpending = (id) => {
        setSpendingList(spendingList.filter((spending) => spending.id !== id));
    };

    //Opens modal form
    const handleNewSpent = () => {
        setModal(true);
        setEditSpending({});
        setTimeout(() => {
            setPopUpModal(true);
        }, 500);
    };

    /* Adding a new spending object  */
    const getSpendingObj = (spendingObj) => {
        if (spendingObj.id) {
            const updateSpending = spendingList.map((spendingState) =>
                spendingState.id === spendingObj.id
                    ? spendingObj
                    : spendingState
            );
            setSpendingList(updateSpending);
            setEditSpending({});
        } else {
            spendingObj.id = createID();
            spendingObj.date = Date.now();
            setSpendingList([...spendingList, spendingObj]);
        }
        /* Close modal  */
        setPopUpModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
        /* ----------------- */
    };

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                spendingList={spendingList}
                setSpendingList={setSpendingList}
                budget={budget}
                setBudget={setBudget}
                isValidBudget={isValidBudget}
                setIsValidBudget={setIsValidBudget}
            />
            {isValidBudget && (
                <>
                    <main>
                        <Filter filter={filter} setFilter={setFilter} />
                        <SpendingList
                            spendingList={spendingList}
                            setEditSpending={setEditSpending}
                            deleteSpending={deleteSpending}
                            filter={filter}
                            filterSpending={filterSpending}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconNewSpent}
                            alt="Icon new spent"
                            onClick={handleNewSpent}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    popUpModal={popUpModal}
                    setPopUpModal={setPopUpModal}
                    getSpendingObj={getSpendingObj}
                    editSpending={editSpending}
                />
            )}
        </div>
    );
}

export default App;
