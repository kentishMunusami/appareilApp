export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public mail: string,
        public password: string,
        public drinkPreference: string,
        public hobbies?: string[]
    ) { }
}