import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    const balance = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type == 'income') {
        accumulator.income += transaction.value;
      } else {
        accumulator.outcome += transaction.value
      }

      accumulator.total = accumulator.income - accumulator.outcome

      return (accumulator)

    }, {income: 0, outcome: 0, total: 0})

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    const balance = this.getBalance()

    if (transaction.type == 'outcome' && balance.total < transaction.value) {
        throw new Error("You don't have balance for this transaction");
    }

      this.transactions.push(transaction);



    return transaction;
  }
}

export default TransactionsRepository;
