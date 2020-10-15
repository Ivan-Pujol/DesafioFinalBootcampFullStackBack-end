import React from 'react';
export default function ModalTransaction({ modalState, setModal }) {
  let transactionType = "unknow";
  const handleOnCloseClick = () => {
    modalState = false;
    setModal(modalState);

  }
  return (<div>
    <h3 className="center">ModalOpen</h3>
    <div style={{ backgroundColor: "lightBlue", border: '1px solid', borderRadius: '5px', marginBottom: "15px" }}>
      <h5 className="center">Modal Open Ativo</h5>
    </div>
    <div>
      <p>
        <input type="radio" name="type" id="1" value="Despeza" style={{ marginLeft: "10px", marginRight: "10px" }} />Despeza
        <input type="radio" name="type" id="2" value="Entrada" style={{ marginLeft: "10px", marginRight: "10px" }} />Entrada
      </p>
    </div>
    <div>
      <label htmlFor="Description" style={{ color: 'black', fontSize: '14px' }}>Descrição: </label>
      <input type="text" name="Description" id=".inputDescription" />
      <label htmlFor="Category" style={{ color: 'black', fontSize: '14px' }}>Categoria: </label>
      <input type="text" name="Category" id=".inputCategory" />
      <label htmlFor="inputDate" style={{ color: 'black', fontSize: '14px' }}>Data: </label>
      <input type="date" name="Date" id=".inputDate" />
    </div>
    <div style={{ marginTop: "15px" }}>
      <button className='waves-effect waves-light btn' onClick={handleOnCloseClick}>Close</button>
    </div>
  </div>)
}