export interface ICategoryForm {
    name: string,
    type: string,
}


export interface ICategory {
    name: string,
    type: string,
    id: string,
}

export interface CategoryList {
    [id: string]: ICategory;
}

export interface TransactionList {
    [id: string]: TransactionType
}

export interface ITransactionForm {
    name: string,
    type: string,
    amount: number,
}

export interface ITransaction {
    transaction: ICategory,
    amount: number,
    id: string,
}


export interface TransactionType {
    category: string,
    amount: number,
    created: string,
}
