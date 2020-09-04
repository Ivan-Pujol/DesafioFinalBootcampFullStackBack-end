import React, { useState, useEffect } from 'react';
import css from './app.module.css';
import { PERIODS } from './helpers/periods'
import ModalTransaction from './helpers/ModalTransaction';
import PeriodSelector from './helpers/PeriodSelector';
import TransactionsTable from './helpers/TransactionsTable';

let promiseData = [];
let lastPeriod = [];
let transactionSelected = '';
const APP_VERSION = 'v0.59';

function getYearAndMonth() {
  const curYear = new Date().getFullYear();
  //const curMonth = (new Date().getMonth()).toString().padStart(2, '0');
  const curMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const YM = curYear + "-" + curMonth;
  //console.log(monthTest);
  const index = PERIODS.indexOf(YM);
  return index;
}

function sortTransactions(transactions) {
  return transactions.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

export default function App() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //M.AutoInit();
    //const URL = `https://backend-desafiofinal.herokuapp.com/api/transaction/getall`;
    const getAllPeriods = () => {
      setAllPeriods(PERIODS);
      setCurrentPeriod(PERIODS[getYearAndMonth()]);
    };
    getAllPeriods();
    /**
     * Título da aba
     */
    document.title = `App Version ${APP_VERSION}`;
  }, []);

  useEffect(() => {
    const URL = `https://backend-desafiofinal.herokuapp.com/api/transaction/gettransactions/${currentPeriod}`;
    //const URL = `http://localhost:3001/api/transaction/gettransactions/${currentPeriod}`;
    const fetchData = async () => {
      if (!currentPeriod) {
        return;
      }
      setCurrentTransactions([]);
      const data = await fetch(URL);
      promiseData = await data.json();
      setCurrentTransactions(promiseData);
    };
    fetchData();
  }, [currentPeriod]);

  React.useEffect(() => {
    const isFiltered = () => {
      if (filterText.trim() === '') {
        setCurrentTransactions(promiseData);
      } else {
        const filteredTransaction = promiseData.filter((transaction) => {
          return transaction.description.toLowerCase().includes(filterText);
        });
        setCurrentTransactions(filteredTransaction);

      }
    }
    isFiltered();
  }, [filterText]);

  const handlePeriodChange = (period) => {
    setCurrentPeriod(period);
  }

  const handleTyping = (event) => {
    const filter = event.target.value.toLowerCase();
    setFilterText(filter);
  }

  function getIncoming() {
    return currentTransactions.filter((transaction) => transaction.type === "+").reduce((acc, cur) => acc + cur.value, 0);
  }

  function getExpenses() {
    return currentTransactions.filter((transaction) => transaction.type === "-").reduce((acc, cur) => acc + cur.value, 0);
  }

  function getBalance() {
    const incoming = getIncoming();
    const expenses = getExpenses();
    return incoming - expenses;
  }

  return <div className='container' style={{ border: "1px solid", borderRadius: "5px", padding: "5px" }}>
    <div className='center' style={{ border: "1px solid", borderRadius: "5px", padding: "5px" }}>
      <h2>Bootcamp Full Stack - Desafio Final</h2>
    </div>
    <div className='center' style={{ border: "1px solid", borderRadius: "5px", padding: "5px", marginTop: "5px" }}>
      <h3>Controle Financeiro Pessoal</h3>
    </div>
    <div className='row' style={{ border: "1px solid", borderRadius: "5px", padding: "5px", marginTop: "5px" }}>
      <div className='container'>
        <div className='col' style={{ marginLeft: "-35px" }}>
          <div className='center'>
            <h5 style={{ marginLeft: "25px" }}>Selecione o Periodo</h5>
            {!isModalOpen && <PeriodSelector selectedPeriod={currentPeriod} onChangePeriod={handlePeriodChange} />}
          </div>
        </div>
        <div className='col' style={{ marginLeft: "55px" }}>
          <div className='center'>
            <h5>Selecione o Filtro</h5>
            <input type="text" name="filtro" id=".filtering" style={{ width: "390px", marginTop: "-10px" }} onChange={handleTyping} placeholder="FILTRE AQUI AS DESPESAS OU ENTRADAS:" />
          </div>
        </div>
      </div>
    </div>
    <div style={{ borderRadius: "5px", border: "1px solid", marginTop: "-15px" }}>
      <div className={css.divSpans} id='.Statistics'>
        <span className={css.stylishedSpan}><strong>lançamentos: {currentTransactions.length}</strong> </span>
        <span className={css.stylishedSpan}><strong>Receitas: {getIncoming()}</strong></span>
        <span className={css.stylishedSpan}><strong>Despesas: {getExpenses()}</strong></span>
        <span className={css.stylishedSpan}><strong>Saldo: {getBalance()}</strong></span>
      </div>
    </div>
    {/* <hr className='doted' /> */}
    <div style={{ marginTop: "5px" }}>
      {!isModalOpen && <TransactionsTable currentTransactions={currentTransactions} />}
    </div>

  </div>
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
}