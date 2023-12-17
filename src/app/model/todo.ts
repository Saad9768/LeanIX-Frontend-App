export type Todo = {
    title: string;
    description: string;
    completed: boolean;
    parentId: string | null;
    userId: string;
}

export type TodoWithId = {
    _id: string;
} & Todo

export type TodoWithChildren = {
    childrens: TodoWithId[]
} & TodoWithId