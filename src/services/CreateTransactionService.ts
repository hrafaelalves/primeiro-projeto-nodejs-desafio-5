import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: TransactionDTO): Transaction {

    if(!["income", "outcome"].includes(type)){
      throw Error('O tipo da transação é inválida');
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === "outcome" && value > total){
      throw Error('Você não tem saldo suficiente.');
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
