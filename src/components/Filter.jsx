import { useState, useEffect } from "react";

const Filter = ({ filter, setFilter }) => {
    return (
        <div className="filtros sombra contenedor">
            <form action="">
                <div className="campo">
                    <label>Filter</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value=""> -- All --</option>
                        <option value="saving">Saving</option>
                        <option value="groceries">Groceries</option>
                        <option value="rent">Rent</option>
                        <option value="car">Car</option>
                        <option value="dinner">Dinner</option>
                        <option value="health">Health</option>
                        <option value="suscriptions">Suscriptions</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Filter;
