import React from "react";
import Spent from "./Spent";

const SpendingList = ({
    spendingList,
    setEditSpending,
    deleteSpending,
    filter,
    filterSpending,
}) => {
    return (
        <div className="listado-gastos contenedor">
            {filter ? (
                <>
                    <h2>{filterSpending.length ? "Spending" : "Empty"}</h2>
                    {filterSpending.map((spent) => (
                        <Spent
                            spent={spent}
                            key={spent.id}
                            setEditSpending={setEditSpending}
                            deleteSpending={deleteSpending}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{spendingList.length ? "Spending" : "Empty"}</h2>
                    {spendingList.map((spent) => (
                        <Spent
                            spent={spent}
                            key={spent.id}
                            setEditSpending={setEditSpending}
                            deleteSpending={deleteSpending}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default SpendingList;
