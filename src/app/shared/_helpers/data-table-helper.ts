import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator/paginator';
import { Table } from 'primeng/table/table';

export class DataTableHelper {
    predefinedRecordsCountPerPage = [5, 10, 15];

    defaultRecordsCountPerPage = 5;

    isResponsive = true;

    resizableColumns: false;

    totalRecordsCount = 0;

    records: any[];

    isLoading = false;

    showLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = true;
        }, 0);
    }

    hideLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 0);
    }

    getSorting(table: Table): string {
        let sorting;
        if (table != undefined && table.sortField != null) {
            sorting = table.sortField;
            if (table.sortOrder === 1) {
                // sorting += ' ASC';
            } else if (table.sortOrder === -1) {
                sorting = '-' + table.sortField;
            }
        }

        return sorting;
    }

    // getSorting(table: Table): string {
    //     let sorting;
    //     if (table != undefined && table.sortField != null) {
    //         sorting = table.sortField;
    //         if (table.sortOrder === 1) {
    //             // sorting += ' ASC';
    //         } else if (table.sortOrder === -1) {
    //             sorting += ' DESC';
    //         }
    //     }

    //     return sorting;
    // }
    getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.rows) {
            return paginator.rows;
        }

        if (!event) {
            return 0;
        }

        return event.rows;
    }

    // getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
    //     if (paginator.first) {
    //         return paginator.first;
    //     }

    //     if (!event) {
    //         return 0;
    //     }

    //     return event.first;
    // }

    getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {

        var pageReturn = 0;
        var intiPage = 0;

        if (paginator != undefined) {

            if (paginator.first != undefined) {

                if (paginator.first == 0)
                    paginator.first = 1;
                else {
                    intiPage = paginator.first;
                    paginator.first = paginator.getPage() + 1
                }
                pageReturn = paginator.first;

                paginator.first = intiPage;

                return pageReturn;
            }
        }

        if (!event) {
            return 1;
        }

        return event.first;
    }

    shouldResetPaging(event: LazyLoadEvent): boolean {
        if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
            return true;
        }

        return false;
    }
}