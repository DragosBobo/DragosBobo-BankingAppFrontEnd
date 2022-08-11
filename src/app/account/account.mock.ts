import { CreateAccountModel } from "./account.model";

enum AccountType { Debit, Credit }
enum Currency { Ron, Euro, Dollar }

//This is a fake account to be created 

 const MockAccount: CreateAccountModel = {
    accountType: AccountType.Credit,
    currency: Currency.Dollar,
    iban: 'MockAccount',
    userId: 'bea5b836-fc86-4813-c81d-08da7531c19b'
  };
  const AccountId = "08f8d362-61fc-4773-a556-eefdb8ece55d";
export {MockAccount , AccountId}