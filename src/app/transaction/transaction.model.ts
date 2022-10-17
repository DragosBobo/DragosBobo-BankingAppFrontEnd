export { TransactionModel, CreateTransactionModel, RaportTransactionModel };

enum CategoryTransaction {
  Food,
  Entertainment,
}

interface TransactionModel {
  totalAmount: number;
  categoryName: string;
  transactionDate: string;
}
interface CreateTransactionModel {
  amount: number;
  categoryTransaction: CategoryTransaction;
  transactionDate: string;
  accountId: string;
}

interface RaportTransactionModel {
  id: string;
  startDate: string;
  lastDate: string;
}
