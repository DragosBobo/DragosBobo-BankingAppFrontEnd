interface AccountModel {
  currency: string;
  accountType: string;
  iban: string;
  accountId: string;
}
interface CreateAccountModel {
  accountType: string | null | undefined;
  currency: string | null | undefined;
  iban: string | null | undefined;
  userId: string | null | undefined;
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
