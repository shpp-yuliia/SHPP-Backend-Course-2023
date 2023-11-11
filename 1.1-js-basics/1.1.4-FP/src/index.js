const CSV_towns_list_example =
`44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
65.23,45.90,Київ,856789,
38.23,21.15,Кропивницький,132364,
46.12,45.28,Ялта,169283,
17.03,75.23,Новоукраїнка,39237,
34.03,61.10,Олександріївка,56726,
89.03,28.19,Комишевате,4726,


# в цьому файлі три рядки-коментарі :)`

function convertCSVToTownList(CSV) {
    const converted_town_list = CSV
        .split(/\n/m)
        .filter(split_town => split_town.match(/^(\d{2}\.\d{2}\,){2}[А-Яа-яІіЇї\s]*\,\d{1,}\,/gm))
        .map(split_town => {
            const filtered_split_town_properties_list = split_town.split(',').slice(0, 4)
            const filtered_split_town_properties_object = new Map([
                ['x', filtered_split_town_properties_list[0]],
                ['y', filtered_split_town_properties_list[1]],
                ['name', filtered_split_town_properties_list[2]],
                ['popularity', filtered_split_town_properties_list[3]]
            ])
            return filtered_split_town_properties_object
        })
        .sort((pre_filtered_split_town, curr_filtered_split_town) =>
            +(curr_filtered_split_town.get('popularity')) - +(pre_filtered_split_town.get('popularity')))
        .slice(0, 5)
        .reduce((accumulator, curr_town, curr_index, towns_list) => {
            const town_name = curr_town.get('name')
            accumulator[town_name] = {}
            accumulator[town_name]['rating'] = curr_index + 1

            const towns_properties = Array.from(curr_town)
            towns_properties.splice(2, 1)

            new Map(towns_properties).forEach((value, key) => {
                accumulator[town_name][key] = value
            })
            return accumulator
        }, {})

    return converted_town_list
}

console.log(convertCSVToTownList(CSV_towns_list_example))