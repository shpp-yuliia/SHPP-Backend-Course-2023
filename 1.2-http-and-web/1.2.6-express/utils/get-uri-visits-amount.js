function getUriVisitsAmount(uri_title, uris_list) {
    const filtered_uris_list = uris_list.split('\n').map(uri_info => uri_info.split(' - ')[0])

    const uri_visits_amount = filtered_uris_list.reduce((counter, uri) => {
        if (uri === uri_title) {
            counter++
        }
        return counter
    }, 0)

    console.log(uri_visits_amount)

    return uri_visits_amount
}

export default getUriVisitsAmount