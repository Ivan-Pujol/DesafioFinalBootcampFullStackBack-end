import React, { useEffect, useState } from 'react';
import Icons from './icons';

let counter = 0;

export default function transactionsTable({ currentTransactions }) {
  const handleIconRemoveClick = () => {
    console.log('Clicou na lixeira');
  }
  const handleIconEditClick = () => {
    console.log('Clicou no lápis');
  }

  function getColorRow(transaction) {
    let bgColor = "pink";
    if (transaction.type === '-') {
      return bgColor;
    } else return bgColor = "aquamarine"
  }

  function getTransactionsTable() {
    return <div id='.transactionsList'>
      <table className="striped" style={{ border: "2px solid" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Value</th>
            <th>yearMonthDay</th>
            <th>Type</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {counter = 1, currentTransactions.map((transaction) => {
            return (<tr style={{ backgroundColor: getColorRow(transaction), border: "2px solid" }} key={transaction._id} >
              <td>{counter++}</td>
              <td>{transaction.description}</td>
              <td>{transaction.value}</td>
              <td>{transaction.yearMonthDay}</td>
              <td>{transaction.type}</td>
              <td><Icons id={transaction._id} typeIcon="edit" onEditClick={handleIconEditClick} /></td>
              <td><Icons id={transaction._id} typeIcon="delete" onRemoveClick={handleIconRemoveClick} /></td>
            </tr>);
          })}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>
  }
  return <div>{getTransactionsTable()}</div>
}