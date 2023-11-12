// 1.

function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}

// 2.

interface UserNamings {
    full_name: string,
    initials: string
}

interface NameInfo {
    name: string,
    surname: string
}

function getUserNamings(name_info: NameInfo): UserNamings {
    return {
        full_name: name_info.name + " " + name_info.surname,
        initials: name_info.name[0] + "." + name_info.surname[0]
    };
}

// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>

type ProductNamesList = (string | undefined)[]
interface ProductsInfoList {
    products?: (ProductInfo | undefined)[]
}

interface ProductInfo {
    name?: string
}

function getAllProductNames(products_info_list: ProductsInfoList): ProductNamesList {
    return products_info_list?.products?.map((prod: ProductInfo | undefined) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

interface PersonInfo {
    name: () => string,
    cuteness?: number,
    coolness?: number
}
function sayHey(person_info: PersonInfo): string {
    return "hey! i'm " + person_info.name();
}

sayHey({name: () => "roma", cuteness: 100})
sayHey({name: () => "vasiliy", coolness: 100})

// 4.2

interface AbstractPet {
    _name: string
    name: () => string,
    other_unknown_properties: boolean | number
}

function sayPetHey(abstractPet: AbstractPet) {
    return "hey! i'm " + abstractPet.name();
}

function Animal (this: AbstractPet, name: string, other_unknown_properties: boolean | number): void {
    this._name = name
    this.name = () => this._name
    this.other_unknown_properties = other_unknown_properties
}

const Cat = Animal
const Dog = Animal

const animal_cat = new Cat("meow_cat", true)
const animal_dog = new Dog("gav_dog", 333)

sayPetHey(animal_cat)
sayPetHey(animal_dog)

// 4.3

interface Someone {
    name: () => string,
    cuteness?: number,
    coolness?: number,
    type: string,
}

function sayHeyToSomeone(someone: Someone): string {
    return "hey! i'm " + someone.name()
        + (someone.type === "cat" ? ("cuteness: "+someone.cuteness) : ("coolness: " + someone.coolness))
}

sayHeyToSomeone({name: () => "roma", type: "cat", cuteness: 100})
sayHeyToSomeone({name: () => "vasiliy", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a: unknown[] | Record<string, unknown>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a): Promise<string> {
    return "*".repeat(a)
}
const hello = async (): Promise<string> => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))