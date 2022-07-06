export default class Todo {
    public id: number = Date.now() + Math.random() * 100;
    public text: string;
    public isComplete: boolean = false;

    constructor(text: string) {
        this.text = text;
    }

    complete(): void {
        this.isComplete = true;
    }

    restart(): void {
        this.isComplete = false;
    }
}