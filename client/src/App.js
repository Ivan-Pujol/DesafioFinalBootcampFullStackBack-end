import React, { useEffect } from 'react';
import css from './app.module.css';
import { PERIODS } from './helpers/periods'
import M from 'materialize-css';

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  React.useEffect(() => {
    const fetchTransactions = async () => {
      const url = `https://backend-desafiofinal.herokuapp.com/api/transaction/gettransactions/${currentPeriod}`;
      const resource = await fetch(url);
      const json = await resource.json();
      setTransactions(json.transaction);
      //console.log(transactions);
    }
    fetchTransactions();

  }, [currentPeriod]);

  React.useEffect(() => {
    M.AutoInit();
  }, [])
  function getIncoming() {
    return transactions.filter((transaction) => transaction.type === "+").reduce((acc, cur) => acc + cur.value, 0);
  }
  function getExpenses() {
    return transactions.filter((transaction) => transaction.type === "-").reduce((acc, cur) => acc + cur.value, 0);
  }
  function getBalance() {
    const incoming = getIncoming();
    const expenses = getExpenses();
    return incoming - expenses;
  }

  const handleSelectChange = (event) => {
    //console.log('onhandlechange event')
    setCurrentPeriod(event.target.value);
  };

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
        <div id='.selectDiv'>
          <select onChange={handleSelectChange}>
            {PERIODS.map((period) => {
              return <option value={period} key={period}>{period}</option>
            })}
          </select>
        </div>
        <div className={css.divSpans} id='.Statistics'>
          <span className={css.stylishedSpan}>lançamentos: {transactions.length}</span>
          <span className={css.stylishedSpan}>Receitas: {getIncoming()}</span>
          <span className={css.stylishedSpan}>Despesas: {getExpenses()}</span>
          <span className={css.stylishedSpan}>Saldo: {getBalance()}</span>
        </div>
        <div id='.transactionsList'>
          {transactions.map((transaction) => {
            return <p key={transaction._id}>descrição:  {transaction.description}  valor:   {transaction.value}   data:   {transaction.yearMonthDay} </p>
          })}
        </div>
      </form>
    </div>
  </div>);
}
const styles = {
  color: {
    color: "blue",
  },
  centralize: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
}