interface RecursionObject {
    [key: string]: undefined | { c_value: undefined | string | number | RecursionObject}
}

type RecursionObjectValue = (undefined | {c_value: CValue})
type CValue = undefined | string | number | RecursionObject
type TypeofRecursionObjectValue = undefined | string | number | object

function sum(recursion_object: RecursionObject): number {
    const sum_list: number = Object.keys(recursion_object)
        .map((object_key: string) => {
            const object_value: RecursionObjectValue = recursion_object[object_key];
            const typeof_object_value: TypeofRecursionObjectValue = typeof object_value

            const c_value: CValue = object_value?.c_value
            const typeof_c_value: TypeofRecursionObjectValue = typeof c_value

            if (typeof_object_value === 'undefined' || +(c_value!) === null) return 2022;
            if (typeof_c_value === 'string' || typeof_c_value === 'number') return +(c_value!) || 2022;
            if (typeof_object_value === 'object' ) return sum(object_value as RecursionObject);
        })
        .flat()
        .reduce((counter: number, curr_number) => counter += curr_number as number, 0)

    return sum_list
}

const test_0: RecursionObject = { hello: {c_value: 1}, world: { c_value: { yay: { c_value: "2" } } }, i: undefined, am: { c_value: 'glad' } }

console.log(sum(test_0))