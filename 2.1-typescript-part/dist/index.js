"use strict";
// 1.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
function getUserNamings(name_info) {
    return {
        full_name: name_info.name + " " + name_info.surname,
        initials: name_info.name[0] + "." + name_info.surname[0]
    };
}
function getAllProductNames(products_info_list) {
    var _a;
    return ((_a = products_info_list === null || products_info_list === void 0 ? void 0 : products_info_list.products) === null || _a === void 0 ? void 0 : _a.map((prod) => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
function sayHey(person_info) {
    return "hey! i'm " + person_info.name();
}
sayHey({ name: () => "roma", cuteness: 100 });
sayHey({ name: () => "vasiliy", coolness: 100 });
function sayPetHey(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
function Animal(name, other_unknown_properties) {
    this._name = name;
    this.name = () => this._name;
    this.other_unknown_properties = other_unknown_properties;
}
const Cat = Animal;
const Dog = Animal;
const animal_cat = new Cat("meow_cat", true);
const animal_dog = new Dog("gav_dog", 333);
sayPetHey(animal_cat);
sayPetHey(animal_dog);
function sayHeyToSomeone(someone) {
    return "hey! i'm " + someone.name()
        + (someone.type === "cat" ? ("cuteness: " + someone.cuteness) : ("coolness: " + someone.coolness));
}
sayHeyToSomeone({ name: () => "roma", type: "cat", cuteness: 100 });
sayHeyToSomeone({ name: () => "vasiliy", type: "dog", coolness: 100 });
// 5.
// google for Record type
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
// 6.
// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it
function world(a) {
    return __awaiter(this, void 0, void 0, function* () {
        return "*".repeat(a);
    });
}
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield world(10);
});
hello().then(r => console.log(r)).catch(e => console.log("fail"));
