import Todo from "./Todo";

export default class Todos {
    public name: string;
    public list: Todo[] = [];
    constructor(name: string) {
        this.name = name;
    }

    add(todo: string): void {
        this.list = [new Todo(todo), ...this.list];
    }

    remove(todo: Todo): void {
        this.list.filter((t: Todo) => t.id !== todo.id);
    }


    initialUpperCase(): string {
        return `${this.name?.substr(0, 1).toUpperCase()}${this.name?.substr(1)}`
    }
}