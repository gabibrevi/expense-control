import React from "react";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatDate } from "../helpers";

import savingIcon from "../img/icono_ahorro.svg";
import homeIcon from "../img/icono_casa.svg";
import mealIcon from "../img/icono_comida.svg";
import spentIcon from "../img/icono_gastos.svg";
import hobbyIcon from "../img/icono_ocio.svg";
import healthIcon from "../img/icono_salud.svg";
import suscriptionsIcon from "../img/icono_suscripciones.svg";
import newSpentIcon from "../img/nuevo-gasto.svg";

const Spent = ({ spent, key, deleteSpending, setEditSpending }) => {
    const { name, amount, category, date, id } = spent;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditSpending(spent)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => deleteSpending(id)}>
                Delete
            </SwipeAction>
        </TrailingActions>
    );
    const icons = {
        saving: savingIcon,
        rent: homeIcon,
        dinner: mealIcon,
        groceries: spentIcon,
        car: hobbyIcon,
        health: healthIcon,
        suscriptions: suscriptionsIcon,
        newSpent: newSpentIcon,
    };

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}>
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={icons[category]} alt="Spent Icon" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">
                                {" "}
                                Added: <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Spent;
