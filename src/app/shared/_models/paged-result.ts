export class PagedResult<T> {
    
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    list: List<T>[];
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage : boolean;
    nextPageNumber: number;
    previousPageNumber: number;
}

export class List<T>{

    List: T[]
}