export { TransactionModel, CreateTransactionModel };

enum CategoryTransaction { Food, Entertainment }

interface TransactionModel {
    totalAmount: number;
    categoryName: string;


}
interface CreateTransactionModel {
    amount: number;
    CategoryTransaction: CategoryTransaction;
    TransactionDate: Date;
    AccountId: string;
}
