import React from "react";

export default function Icons({ id, typeIcon, onIconCompClick }) {
  const handleOnClick = () => {
    onIconCompClick(id, typeIcon);
  }
  return <span className="material-icons" style={{ cursor: 'pointer' }} onClick={handleOnClick}>{typeIcon}</span>
}

