import React from "react";
import ModalTransaction from "./ModalTransaction"

export default function Icons({ id, typeIcon, onEditClick, onRemoveClick, lastTransaction }) {

  const handleOnClick = () => {
    if (typeIcon === "edit") {
      onEditClick({ id, lastTransaction });
    } else {
      onRemoveClick(id);
    }
  }
  return <span className="material-icons" style={{ cursor: 'pointer' }} onClick={handleOnClick}>{typeIcon}</span>
}
