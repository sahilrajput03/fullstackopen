import axios from 'axios'
// const baseurl = 'http://192.168.43.29:3001/notes'
// const baseurl = 'http://localhost:3001/notes'
// const baseurl = 'http://damp-atoll-37310.herokuapp.com/notes'
const baseurl = '/notes'

const getAll = () => {
    const nonExisting = {
        id: 10000,
        content: 'HardCodedNote-Immutable',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
      }
    return axios.get(baseurl).then(response => response.data.concat(nonExisting));
}

const create = newObject => {
    return axios.post(baseurl, newObject).then(response => response.data);
}

const update = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject).then(response => response.data)
}

export default {getAll,create,update}