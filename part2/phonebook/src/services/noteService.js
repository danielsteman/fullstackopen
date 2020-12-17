import axios from 'axios'

const baseUrl = '/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const remove = id => {
    return axios.delete(baseUrl + '/' + id)
}

const update = newObject => {
    return axios.put(baseUrl + '/' + newObject.id, newObject)
}

export default {
    create,
    getAll,
    remove,
    update
}

