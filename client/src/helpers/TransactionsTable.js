import React, { useEffect, useState } from 'react';
import Icons from './icons';

let counter = 0;

export default function transactionsTable({ currentTransactions, onEditIconClick, onRemoveIconClick }) {

  function getColorRow(transaction) {
    let bgColor = "pink";
    if (transaction.type === '-') {
      return bgColor;
    } else return bgColor = "aquamarine"
  }

  function getTransactionsTable() {
    let selectedTransaction = [];
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
            //selectedTransaction = [transaction.description, transaction.value, transaction.yearMonthDay, transaction.type]
            return (<tr style={{ backgroundColor: getColorRow(transaction), border: "2px solid" }} key={transaction._id} >
              <td>{counter++}</td>
              <td>{transaction.description}</td>
              <td>{transaction.value}</td>
              <td>{transaction.yearMonthDay}</td>
              <td>{transaction.type}</td>
              <td><Icons id={transaction._id} typeIcon="edit" onEditClick={onEditIconClick} /></td>
              <td><Icons id={transaction._id} typeIcon="delete" onRemoveClick={onRemoveIconClick} /></td>
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