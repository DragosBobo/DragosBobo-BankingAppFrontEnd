import { CreateTransactionModel, RaportTransactionModel } from "./transaction.model";

var TransactionId = "b4b5e87c-98a4-4457-824b-9768433e9cce";
enum CategoryTransaction { Food, Entertainment }

var CreateTransaction: CreateTransactionModel = {
    amount: 893,
    categoryTransaction: CategoryTransaction.Food,
    transactionDate: "2022-01-15T18:06:52.808Z",
    accountId: `${TransactionId}`
}

var RaportTransaction : RaportTransactionModel = {
    id: `${TransactionId}`,
    startDate: "2022-08-11 14:32:33.1970000 +00:00",
    lastDate: "2022-09-11 14:32:33.1970000 +00:00"
}
export { TransactionId ,CreateTransaction,RaportTransaction}