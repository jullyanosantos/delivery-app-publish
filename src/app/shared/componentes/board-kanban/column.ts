export class Column {
    constructor(
        public id: number,
        public name: string,
        public tasks: any[],
        public status?: number,
        public cssTaskClass?: string,
        public iconClass?: string) { }
}