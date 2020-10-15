//import routes from "../routes/routes";
const routes = require('../routes/routes.js');
const transactionModel = require('../models/TransactionModel');
//import transactionModel from "../models/TransactionModel";

async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionModel.find();

    if (transactions.length < 1) {
      res.status(404).send({ message: 'Nenhuma transação encontrada' });
      return;
    }

    res.send(transactions);
  } catch (err) {
    res
      .status(500)
      .send(err.message);
  }
}

async function getYearMonth(req, res) {
  try {
    let text = Object.entries(req.params);
    yearMonth = text[0];
    const transaction = await transactionModel.find({ yearMonth });
    if (!transaction) res.status(400).send("No transactions were found!");
    res.send(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
async function balanceYearMonth(req, res) {
  try {
    let yearMonth = Object.entries(req.params);
    yearMonth = yearMonth[0][1];
    const salary = await transactionModel.find({ type: "+", yearMonth }, { _id: 0, value: 1 });
    if (!salary) res.status(400).send("Salary wasn't found!");
    let value = salary.map(item => item.value);
    const expenses = await transactionModel.find({ type: "-", yearMonth })
    expenses.forEach(item => {
      value -= item.value;
    })
    res.send(`The balance of ${yearMonth} is ` + "R$ " + value);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
async function filteredExpenses(req, res) {
  try {
    const { filter, yearMonth, type } = req.body;
    const expenses = await transactionModel.find({ description: { $regex: filter }, type, yearMonth }, { _id: 0, value: 1, description: 1, yearMonth: 1 });
    //const expenses = await transactionModel.aggregate([{ $project: { _id: 0 } }, { $match: { description: filter, category: filter } }]);
    if (!expenses) res.status(400).send("Expenses weren't found!");
    let result = 0;
    expenses.forEach(expense => {
      result += expense.value;
    });
    let resMsg = `The expenses of ${yearMonth} are: `;
    res.status(200).send({ "The expenses of period was: ": result, expenses });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
async function includeTransaction(req, res) {
  try {
    const { description, value, category, year, month, day, yearMonth, yearMonthDay, type } = req.body;
    const transaction = await transactionModel({ description, value, category, year, month, day, yearMonth, yearMonthDay, type });
    if (transaction != null)
      await transaction.save();
    res.status(200).send(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function editTransaction(req, res) {
  try {
    const { _id, description, value, category, year, month, day, yearMonth, yearMonthDay, type } = req.body;
    const transaction = await transactionModel({ _id, description, value, category, year, month, day, yearMonth, yearMonthDay, type });
    if (transaction != null)
      await transaction.save();
    res.status(200).send(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function deleteTransaction(req, res) {
  try {
    const { _id } = req.body;
    const transaction = await transactionModel.findOne({ _id });
    if (!transaction) res.status(500).send("No such _id was found");
    await transaction.deleteOne();
    res.status(200).send('Transaction deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function findTransactionById(req, res) {
  try {
    const id = Object.entries(req.params);
    const _id = id[0][1];
    const transaction = await transactionModel.findOne({ _id });
    if (!transaction) res.status(500).send({});
    res.status(200).send(transaction);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = { getYearMonth, balanceYearMonth, filteredExpenses, includeTransaction, editTransaction, deleteTransaction, getAllTransactions, findTransactionById };