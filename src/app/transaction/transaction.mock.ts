import { CreateTransactionModel, RaportTransactionModel } from './transaction.model';

var TransactionId = 'b4b5e87c-98a4-4457-824b-9768433e9cce';
enum CategoryTransaction {
  Food,
  Entertainment,
}

var RaportTransaction: RaportTransactionModel = {
  id: `${TransactionId}`,
  startDate: 'new Date()',
  lastDate: 'new Date(),',
};
export { TransactionId, RaportTransaction };
