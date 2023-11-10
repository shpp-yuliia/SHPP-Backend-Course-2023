"use strict"

function generateTypeMistake (variable_name) {
    throw new Error (`You cannot declare "${variable_name}" variable in such type.`)
}

function generateUndefinedMistake (variable_name) {
    throw new Error (`The variable "${variable_name}" with such property is not found`)
}

// gs = getter-setter

function Product([ID, name, description, price, brand, sizes, active_size, quantity, date, reviews, images]) {
    typeof ID === 'string' ? this.ID = ID : generateTypeMistake('ID')
    typeof name === 'string' ? this.name = name : generateTypeMistake('name')
    typeof description === 'string' ? this.description = description : generateTypeMistake('description')
    typeof brand === 'string' ? this.brand = brand : generateTypeMistake('brand')
    typeof active_size === 'string' ? this.active_size = active_size : generateTypeMistake('active_size')
    typeof quantity === 'number' ? this.quantity = quantity : generateTypeMistake('quantity')

    Array.isArray(sizes) ? this.sizes = sizes : generateTypeMistake('sizes') // array
    Array.isArray(reviews) ? this.reviews = reviews : generateTypeMistake('reviews') // array
    Array.isArray(images) ? this.images = images : generateTypeMistake('images') // array

    price % 1 !== 0 ? this.price = price : generateTypeMistake('price') // float

    date instanceof Date ? this.date = date : generateTypeMistake('date') // date

    this.ID_gs = (new_ID) => {
        const typeofID = typeof new_ID
        if (typeofID === 'string') this.ID = new_ID // setter
        if (typeofID === 'undefined') return this.ID // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('ID')
    }

    this.name_gs = (new_name) => {
        const typeofID = typeof new_name
        if (typeofID === 'string') this.name = new_name // setter
        if (typeofID === 'undefined') return this.name // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('name')
    }

    this.description_gs = (new_description) => {
        const typeofID = typeof new_description
        if (typeofID === 'string') this.name = new_description // setter
        if (typeofID === 'undefined') return this.description // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('description')
    }

    this.brand_gs = (new_brand) => {
        const typeofID = typeof new_brand
        if (typeofID === 'string') this.brand = new_brand // setter
        if (typeofID === 'undefined') return this.brand // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('brand')
    }

    this.active_size_gs = (new_active_size) => {
        const typeofID = typeof new_active_size
        if (typeofID === 'string') this.active_size = new_active_size // setter
        if (typeofID === 'undefined') return this.active_size // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('active_size')
    }

    this.quantity_gs = (new_quantity) => {
        const typeofID = typeof new_quantity
        if (typeofID === 'string') this.quantity = new_quantity // setter
        if (typeofID === 'undefined') return this.quantity // getter
        if (typeofID !== 'string' && typeofID !== 'undefined') generateTypeMistake('quantity')
    }

    this.sizes_gs = (new_sizes) => {
        const typeofID = typeof new_sizes
        if (Array.isArray(typeofID)) this.sizes = new_sizes // setter
        if (typeofID === 'undefined') return this.sizes // getter
        if (!Array.isArray(typeofID) && typeofID !== 'undefined') generateTypeMistake('sizes')
    }

    this.reviews_gs = (new_reviews) => {
        const typeofID = typeof new_reviews
        if (Array.isArray(typeofID)) this.reviews = new_reviews // setter
        if (typeofID === 'undefined') return this.reviews // getter
        if (!Array.isArray(typeofID) && typeofID !== 'undefined') generateTypeMistake('reviews')
    }

    this.images_gs = (new_images) => {
        const typeofID = typeof new_images
        if (Array.isArray(new_images)) this.images = new_images // setter
        if (typeofID === 'undefined') return this.images // getter
        if (!Array.isArray(new_images) && typeofID !== 'undefined') generateTypeMistake('images')
    }

    this.price_gs = (new_price) => {
        const typeofID = typeof new_price
        if (typeofID % 1 !== 0) this.name = new_price // setter
        if (typeofID === 'undefined') return this.price // getter
        if (typeofID % 1 !== 0 && typeofID !== 'undefined') generateTypeMistake('price')
    }

    this.date_gs = (new_date) => {
        const typeofID = typeof new_date
        if (typeofID instanceof Date) this.date = new_date // setter
        if (typeofID === 'undefined') return this.date // getter
        if (typeofID instanceof Date && typeofID !== 'undefined') generateTypeMistake('date')
    }

    this.getReviewByID = (ID) => {
        const typeof_ID = typeof ID
        if (typeof_ID !== 'string') generateTypeMistake('ID')
        let necessary_review;
        this.reviews.forEach(review => {
            if (review.ID === ID) necessary_review = review
        })
        return necessary_review ? necessary_review : generateUndefinedMistake('review')
    }

    this.getImage = (image_name) => {
        const typeof_image_name = typeof image_name
        if (typeof_image_name !== 'string') generateTypeMistake('image_name')
        let necessary_image;
        this.reviews.forEach(image => {
            if (image === image_name) necessary_image = image
        })
        return necessary_image ? necessary_image : generateUndefinedMistake('image')
    }

    this.addSize = (new_size) => {
        const typeof_new_size = typeof new_size
        if (typeof_new_size !== 'string') generateTypeMistake('new_size')
        this.sizes.push(new_size)
        return `Size "${new_size}" is successfully created in the sizes list!`
    }

    this.deleteSize = (removed_size) => {
        const typeof_removed_size = typeof removed_size
        if (typeof_removed_size !== 'string') generateTypeMistake('removed_size')
        this.sizes.forEach(size => {
            if (size !== removed_size) return size
        })
        return `Size "${removed_size}" is successfully removed from sizes list!`
    }

    this.addReview = (new_review) => {
        const typeof_new_review = typeof new_review
        if (!(typeof_new_review instanceof Review)) generateTypeMistake('new_review')
        this.sizes.push(new_review)
        return `Review "${new_review}" is successfully created in the reviews list!`
    }

    this.deleteReviewByID = (deleted_review_ID) => {
        const typeof_deleted_review_ID = typeof deleted_review_ID
        if (typeof_deleted_review_ID !== 'string') generateTypeMistake('deleted_review_ID')
        this.reviews.forEach(review => {
            if (review !== deleted_review_ID) return review
        })
        return `Review with ID "${deleted_review_ID}" is successfully removed from the reviews list!`
    }

    this.getAverageRating = () => {
        const reviews_amount = this.reviews.length
        const average_rating = Math.round([...this.reviews.map(review => {
            const { rating } = review
            const rating_keys_amount = rating.size
            let rating_summa = 0
            for (let [key, value] of rating) {
                rating_summa += value
            }

            const average_rating = Math.round(rating_summa / rating_keys_amount)

            return average_rating
        })]
        .reduce((preVal, currVal, currInd, array) => preVal + currVal, 0) / reviews_amount)

        return average_rating
    }
}

function Review([ID, author, date, comment, rating]) {
    typeof ID === 'string' ? this.ID = ID : generateTypeMistake('ID')
    typeof author === 'string' ? this.ID = ID : generateTypeMistake('author')
    typeof comment === 'string' ? this.comment = comment : generateTypeMistake('comment')

    date instanceof Date ? this.date = date : generateTypeMistake('date')

    typeof rating === 'object' ? this.rating = rating : generateTypeMistake('rating')
}

const review_one_rating = new Map([['service', 10], ['price', 6], ['value', 7], ['quality', 2]])
const review_two_rating = new Map([['service', 7], ['price', 5], ['value', 4], ['quality', 5]])
const review_three_rating = new Map([['service', 2], ['price', 3], ['value', 5], ['quality', 8]])

const review_one = new Review(['1', 'Oleg', new Date(), 'comment-0', review_one_rating])
const review_two = new Review(['2', 'Andrey', new Date(), 'comment-1', review_two_rating])
const review_three = new Review(['3', 'Max', new Date(), 'comment-2', review_three_rating])
const product_one_list = ['1', 'shorts', 'green shorts for children', 4.5, 'Super brand', ['M', 'L', 'S'], 'S', 5, new Date(), [review_one, review_two, review_three], ['image_0']]

const product_one = new Product(product_one_list)

console.log(product_one.sizes_gs())
console.log(product_one.addSize('L'))
console.log(product_one.sizes_gs())
// console.log(product_one.getReviewByID('3'))
// console.log(product_one.getAverageRating())





// functions


function sortProducts(products_list, search) {
    const product_values_list = Object.values(products_list[0])
    const product_keys_list = Object.keys(products_list[0])

    const filtered_product_keys_list = product_keys_list
        .map((product_key, index) => {
            const typeof_product_value = typeof product_values_list[index]
            if (typeof_product_value === 'string' || typeof_product_value === 'number') return product_key
        })
        .filter(product_key => product_key !== undefined)

    if (!filtered_product_keys_list.includes(search)) generateUndefinedMistake('product_key')

    const sorted_products_list = products_list.sort((preProd, nextProd) => preProd[search] - nextProd[search])

    return sorted_products_list
}

const product_two_list = ['2', 'jumpers', 'boys jumpers', 4.45, 'Maybelline', ['X', 'L'], 'L', 5, new Date(), [review_one, review_two], ['image_1']]
const product_two = new Product(product_two_list)

// console.log(sortProducts([product_two, product_one], 'ID')) // the product_one will be the first
// console.log(sortProducts([product_two, product_one], 'images')) // will receive an error
function searchProducts(products, sort_rule) {
    const converted_sort_rule_to_regexp = sort_rule
        .split('')
        .map(el => el === '*' ? '.*' : el)
        .join('')

    const regexp = new RegExp(`${converted_sort_rule_to_regexp}`, 'gm')

    const matched_products = []

    products.forEach(product => product.match(regexp) ? matched_products.push(product) : '')

    return matched_products
}

const products_list = ['футболка', 'майка', 'шорти', 'штани для футболу']

// console.log(searchProducts(products_list, 'футб*'))
