export class User {
    _id: string;
    constructor(
        public user_name: String,
        public email: String,
        public password: String,
        public name: String,
        public pool_gallons: Number,
        public pool_type: String,
        public chemicals: Chemicals,
    ) {}
}

export class Chemicals {
    _id: string;
    constructor(
        public chlorine: String,
        public ph_up: String,
        public ph_down: String,
        public alkalinity_up: String,
        public alkalinity_down: String,
        public calcium_up: String,
        public calcium_down: String,
    )
    {}

}
