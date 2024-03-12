export class Hero {
    private _id: number;
    private _name: string;
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }
    get name(): string {return this._name}
    set name(newName: string) {this._name = newName}
    get id(): number {return this._id}
    set id(newId: number) { this._id = newId}
}

export let heroes = [
    new Hero(1, 'spider-man'),
    new Hero(2, 'super-man'),
    new Hero(3, 'bat-man'),
    new Hero(5, 'speed'),
    new Hero(9, 'venom'),
    new Hero(11, 'zeus'),
    new Hero(16, 'neptune'),
    new Hero(18, 'napoleon'),
]