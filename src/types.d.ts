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
