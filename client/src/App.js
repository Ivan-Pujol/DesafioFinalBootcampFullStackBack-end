import React from 'react';
import css from './app.module.css';

export default function App() {
  const transact = async () => {
    await JSON.parse(transact);
  }
  const objTransact = async () => {
    await JSON.parse(transact);
  }

  //const newObject = JSON.parse(objectTransaction);
  console.log(objTransact);

  return (<div className='container'>
    <div className={css.board}>
      <h1 className='center'>Desafio Final do Bootcamp Full Stack</h1>
      <form action="">
        <h2 className='center'>Controle Financeiro Pessoal</h2>
        <hr className='doted' />
        <select className='browser-default' style={styles.centralize}>
          <option>teste</option>
          <option>gg</option>
        </select>
        <div className={css.divSpans} id='.FourElements'>
          <span className={css.stylishedSpan}>lançamentos:</span>
          <span className={css.stylishedSpan}>Receitas:</span>
          <span className={css.stylishedSpan}>Despesas:</span>
          <span className={css.stylishedSpan}>Saldo:</span>
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