
interface AccountModel{
    currency:string;
    accountType:string;
    iban:string;
    accountId:string;
}
 interface CreateAccountModel{
    accountType:AccountType;
    currency:Currency;
    iban:string;
    userId:string;
}
enum AccountType { Debit, Credit }
enum Currency { Ron, Euro, Dollar }
export { AccountModel, CreateAccountModel }