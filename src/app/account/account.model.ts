interface AccountModel {
  currency: string;
  accountType: string;
  iban: string;
  accountId: string;
}
interface CreateAccountModel {
  accountType: AccountType;
  currency: Currency;
  iban: string;
  userId: string;
}
const modal: AccountModel = {
  accountId: 'modal',
  accountType: 'modal',
  currency: 'modal',
  iban: 'modal',
};
enum AccountType {
  Debit,
  Credit,
}
enum Currency {
  Ron,
  Euro,
  Dollar,
}

export { AccountModel, CreateAccountModel, AccountType, Currency, modal };
