const express = require('express');
const transactionRouter = express.Router();
const transactController = require('../controllers/transactionController.js');
const app = express();
//module.exports = transactionRouter;

app.get('/getall', transactController.getAllTransactions);
app.get('/gettransactions/:period', transactController.getYearMonth);
app.get('/balance/:period', transactController.balanceYearMonth);
app.get('/filter', transactController.filteredExpenses);
app.post('/include', transactController.includeTransaction);
app.put('/edit', transactController.editTransaction);
app.delete('/delete', transactController.deleteTransaction);
app.get('/find/:id', transactController.findTransactionById);
module.exports = app;