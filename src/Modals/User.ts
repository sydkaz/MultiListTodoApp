import Todos from "./Todos";
import Todo from "./Todo";

export class User {

    public firstName: string;
    public lastName: string;
    public email: string;
    public password?: string;
    public todoLists: Todos[];
    public selectedList: Todos | null;

    constructor(firstName?: string, lastName?: string, email?: string, password?: string) {

        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.password = password;
        this.todoLists = [];
        this.selectedList = null;
    }


    fromJSON(json: User) {
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.password = json.password;
        this.todoLists = json.todoLists?.map((tl: Todos) => {
            let mappedTl = new Todos(tl?.name);
            mappedTl.list = tl?.list;
            return mappedTl;
        });
        this.selectedList = this.todoLists?.length? this.todoLists[0] : null;
        if (this.selectedList) {
            this.selectedList.list = this.selectedList?.list.map((td: Todo) => {
                let mappedTodo = new Todo(td.text);
                mappedTodo.id = td.id;
                mappedTodo.isComplete = td.isComplete;
                return mappedTodo;

            })
        }
        return this;
    }
}

export const storeUsers = (users: User[], user: User): User | null => {
    localStorage.setItem('todo-users', JSON.stringify(users));
    alert('User has been created');
    return user;
}

export const addUserToDB = (user: User): User | null => {
    let users: User[];
    let areUsers: string | null = localStorage.getItem('todo-users');
    if (areUsers) {
        users = JSON.parse(areUsers);
        let userExists = users.find((u: User) => u.email === user.email);
        if (userExists) {
            alert('User with this email already exists');
            return null;
        } else {
            users = [...users, user];
            return storeUsers(users, user);
        }
    } else {
        users = [user];
        return storeUsers(users, user);

    }
}

export const authenticateUser = (user: { email: string, password: string }): User | null => {

    let areUsers: string | null = localStorage.getItem('todo-users');
    if (areUsers) {
        try {
            let users: User[] = JSON.parse(areUsers);
            let userExists: User | undefined = users.find((u: User) => u.email === user.email && u.password === user.password);
            if (userExists) {
                // alert(`Logged in successfully as ${userExists.firstName} ${userExists.lastName}`);
                return userExists;
            } else {
                // alert(`Incorrect username or password`);
                return null;
            }
        } catch (error) {

        }
    }
    return null;
}

export const updateUsers = (user: User) => {
    let oldUsers = localStorage.getItem('todo-users');
    if (oldUsers) {
        let users = JSON.parse(oldUsers);
        users = users.map((u: User) => {
            if (u.email === user.email) {
                return user;
            }
            return u;
        })
        localStorage.setItem('todo-users', JSON.stringify(users));
    }
}