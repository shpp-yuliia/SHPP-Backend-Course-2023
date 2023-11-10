function ReturnTypeError() {
    throw new Error('You cannot set variable with such type.')
}

class Product {
    constructor (ID, name, description, price, reviews_quantity, reviews_list, images_list, date, brand) {
        this.ID = ID
        this.name = name
        this.description = description
        this.price = price
        this.reviews_quantity = reviews_quantity
        this.reviews_list = reviews_list
        this.images_list = images_list
        this.date = date
        this.brand = brand

        if (this.constructor === Product) throw new Error('You cannot use abstract class for creating variables.')
    }

    GSProductProperty (property_name, property_new_value) {
        const property_value = this[property_name]

        if (property_new_value === undefined) return property_value // getter
        if (property_new_value) {
            this[property_name] = property_new_value // setter
            console.log(`New value of ${property_name} is successfully set.`)
        }

        if (!property_value) throw new Error (`There is no such property as ${property_name}`)
    }

    getFullInformation() {
        const class_variables_list = Object.keys(this)
            .map(class_variable => `${class_variable} - ${this[class_variable]}`)
            .join('\n')

        return class_variables_list
    }

    getPriceForQuantity (quantity) {
        if (!(Number.isInteger(quantity))) throw new Error (`The product quantity is not valid.`)

        const basic_price = +(this.price.match(/[0-9]*\.?[0-9]*/gm).join(''))
        const quantity_products_price = basic_price * quantity
        const money_symbol = this.price.match(/^\D{1}(?=[^\s\.])/gm).join('')

        return `${money_symbol}${quantity_products_price}`
    }
}

class Material extends Product {
    constructor(ID, name, description, price, reviews_quantity, reviews_list, images_list, date, brand, material, color) {
        super(ID, name, description, price, reviews_quantity, reviews_list, images_list, date, brand);
        this.material = material
        this.color = color
    }

    get material () {
        return this._material
    }

    set material (new_material) {
        const typeof_new_material = typeof new_material
        if (typeof_new_material === 'string') this._material = new_material
        if (typeof_new_material !== 'string') ReturnTypeError()
    }

    get color () {
        return this._color
    }

    set color (new_color) {
        const typeof_new_color = typeof new_color
        if (typeof_new_color === 'string') this._color = new_color
        if (typeof_new_color !== 'string') ReturnTypeError()
    }
}

class Electronics extends Product {
    constructor(ID, name, description, price, reviews_quantity, reviews_list, images_list, date, brand, warranty, power) {
        super(ID, name, description, price, reviews_quantity, reviews_list, images_list, date, brand);
        this.warranty = warranty
        this.power = power
    }

    get power () {
        return this._power
    }

    set power (new_power) {
        const typeof_new_power = typeof new_power
        if (typeof_new_power === 'string') this._power = new_power
        if (typeof_new_power !== 'string') ReturnTypeError()
    }

    get warranty () {
        return this._warranty
    }

    set warranty (new_warranty) {
        const typeof_new_warranty = typeof new_warranty
        if (typeof_new_warranty === 'string') this._warranty = new_warranty;
        if (typeof_new_warranty !== 'string') ReturnTypeError()
    }
}


// --- tests ---

const product_one_properties_list = ['1', 'product_one', 'description', '₴1.2', 10, [{}, {}], ['image_0'], new Date(), 'brand']

// const product_one = new Product(...product_one_properties_list) error: cannot use abstract class for creating variables

// ----- material -----


const material_one_properties_list = [...product_one_properties_list, 'material_0', 'color_0']

const material_one = new Material(...material_one_properties_list)

/*
console.log(material_one.getFullInformation())

console.log(material_one.material, material_one.color)
material_one.material = 'material_1'
material_one.color = 'color_1'
console.log(material_one.material, material_one.color)
 */

// ----- electronics -----

const electronics_one_properties_list = [...product_one_properties_list, 'warranty_0', 'power_0']

const electronics_one = new Electronics(...electronics_one_properties_list)

/*
console.log(electronics_one.getFullInformation())

console.log(electronics_one.GSProductProperty('date'))
electronics_one.GSProductProperty('date', new Date())
console.log(electronics_one.GSProductProperty('date'))

console.log(electronics_one.warranty, electronics_one.power)
electronics_one.warranty = 'warranty_1'
electronics_one.power = 'power_1'
console.log(electronics_one.warranty, electronics_one.power)
 */