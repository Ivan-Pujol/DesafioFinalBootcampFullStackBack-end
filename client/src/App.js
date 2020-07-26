import React, { useEffect } from 'react';
import css from './app.module.css';
import { PERIODS } from './helpers/periods'
import M from 'materialize-css';
import Icons from './helpers/icons'
import ModalTransaction from './helpers/ModalTransaction';
let promiseData = [];
let counter = 1;



export default function App() {
  // function getYearAndMonth() {
  //   const curYear = new Date().getFullYear();
  //   //const curMonth = (new Date().getMonth()).toString().padStart(2, '0');
  //   const curMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  //   const YM = curYear + "-" + curMonth;
  //   //console.log(monthTest);
  //   const index = PERIODS.indexOf(YM);
  //   return index;
  // }
  const [Transactions, setTransactions] = React.useState([]);
  const [transactionFilter, setTransactionFilter] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState('5f09c99838a95f55a0071e06');

  useEffect(() => {
    M.AutoInit();
  }, [])


  React.useEffect(() => {

    const fetchTransactions = async () => {
      const url = `https://backend-desafiofinal.herokuapp.com/api/transaction/gettransactions/${currentPeriod}`;
      const resource = await fetch(url);
      const json = await resource.json();
      promiseData = [...json.transaction];
    }
    fetchTransactions();
    const filteredTransaction = promiseData.filter((transaction) => {
      return transaction.description.toLowerCase().includes(transactionFilter);
    });
    setTransactions(filteredTransaction);
  }, [currentPeriod, transactionFilter]);

  useEffect(() => {
    const fetchSelectedTransaction = async () => {
      //const url = `https://backend-desafiofinal.herokuapp.com/api/transaction/id/${selectedTransaction}`;
      const url = `http://localhost:3001/api/transaction/id/${selectedTransaction}`;
      const resource = await fetch(url);
      const json = await resource.json();
      console.log(json)
      setSelectedTransaction(json);
    }
    fetchSelectedTransaction();
    getSelectPeriods();
  }, [isModalOpen])


  function getIncoming() {
    return Transactions.filter((transaction) => transaction.type === "+").reduce((acc, cur) => acc + cur.value, 0);
  }

  function getExpenses() {
    return Transactions.filter((transaction) => transaction.type === "-").reduce((acc, cur) => acc + cur.value, 0);
  }

  function getBalance() {
    const incoming = getIncoming();
    const expenses = getExpenses();
    return incoming - expenses;
  }

  const handleSelectChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const handleTyping = (event) => {
    const filter = event.target.value.toLowerCase();
    setTransactionFilter(filter);
  }
  const handleIconCompClick = (_id, typeIcon) => {

    if (typeIcon === "edit") {
      console.log(_id);
      setSelectedTransaction(_id);
      setIsModalOpen(true);
    }
  }

  function getSelectPeriods() {
    if (!isModalOpen) {
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
            {counter = 1, Transactions.map((transaction) => {
              return (<tr style={{ backgroundColor: getColorRow(transaction), border: "2px solid" }} key={transaction._id} >
                <td>{counter++}</td>
                <td>{transaction.description}</td>
                <td>{transaction.value}</td>
                <td>{transaction.yearMonthDay}</td>
                <td>{transaction.type}</td>
                <td><Icons id={transaction._id} typeIcon="edit" onIconCompClick={handleIconCompClick} /></td>
                <td><Icons id={transaction._id} typeIcon="delete" onIconCompClick={handleIconCompClick} /></td>
              </tr>);
            })}
          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>
    } else {
      return <div></div>;
    }
  }

  function getColorRow(transaction) {
    let bgColor = "pink";
    if (transaction.type === '-') {
      return bgColor;
    } else return bgColor = "aquamarine"
  }

  return (<div className='container'>
    <div className={css.board}>
      <div id='.h1Div'>
        <h1 className='center'>Desafio Final do Bootcamp Full Stack</h1>
      </div>
      <form action="">
        <hr className='doted' />
        <div id='.h2Div'>
          <h2 className='center'>Controle Financeiro Pessoal</h2>
        </div>
        <hr className='doted' />
        <div className='container' id='.selectDiv'>
          <select onChange={handleSelectChange} style={styles.select}>
            {PERIODS.map((period) => {
              return <option value={period} key={period}>{period}</option>
            })}
          </select>
        </div>
        <hr className='doted' />
        <div className={css.divSpans} id='.Statistics'>
          <span className={css.stylishedSpan}>lançamentos: {Transactions.length}</span>
          <span className={css.stylishedSpan}>Receitas: {getIncoming()}</span>
          <span className={css.stylishedSpan}>Despesas: {getExpenses()}</span>
          <span className={css.stylishedSpan}>Saldo: {getBalance()}</span>
        </div>
        <hr className='doted' />
        <div className='container'>
          <div className={css.buttonAndFilter} id='.buttonAndFilter'>
            <button style={styles.button}>Nova Transação</button>
            <input type="text" name="inputFilter" id=".filterTransactions" style={styles.inputT} onChange={handleTyping} placeholder="FILTRE AQUI AS DESPESAS OU ENTRADAS:" />
          </div>
        </div>
        <hr className='doted' />
        {getSelectPeriods()}
        {/* <div id='.transactionsList'>
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
              {counter = 1, Transactions.map((transaction) => {
                return (<tr style={{ backgroundColor: getColorRow(transaction), border: "2px solid" }} key={transaction._id} >
                  <td>{counter++}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.value}</td>
                  <td>{transaction.yearMonthDay}</td>
                  <td>{transaction.type}</td>
                  <td><Icons id={transaction._id} typeIcon="edit" onIconCompClick={handleIconCompClick} /></td>
                  <td><Icons id={transaction._id} typeIcon="delete" onIconCompClick={handleIconCompClick} /></td>
                </tr>);
              })}
            </tbody>
            <tfoot>

            </tfoot>
          </table>
        </div> */}
      </form>
    </div>
    {isModalOpen && <ModalTransaction data={selectedTransaction} />}
  </div>);
}
const styles = {
  button: {
    width: "200px",
    height: "35px",
    marginTop: "10px",
    marginRight: "15px",
  },
  select: {
    width: "300px",
    height: "35px",
    marginRight: "15px",
    marginLeft: "15px",
  },
  inputT: {

  },
}
