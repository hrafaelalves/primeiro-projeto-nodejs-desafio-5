import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let totalIncome = 0;
    let someIncome = this.transactions.reduce((accumulator, item) => {
        if(item.type === "income"){
          totalIncome = accumulator + item.value;
        }

        return totalIncome;
    }, 0);

    let totalOutcome = 0;
    let someOutcome = this.transactions.reduce((accumulator, item) => {
        if(item.type === "outcome"){
          totalOutcome = accumulator + item.value;
        }

        return totalOutcome;
    }, 0);

    let total = someIncome - someOutcome;

    const balance = {
      "income": someIncome,
      "outcome": someOutcome,
      "total": total
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
