const api = "https://reactnd-books-api.udacity.com";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

// Set default headers
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

/**
 * @description Get a book
 * @param bookId
 * @returns {Promise<Response | never>}
 */
export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {headers})
        .then(res => res.json())
        .then(data => data.book);

/**
 * @description Get all books
 * @returns {Promise<Response | never>}
 */
export const getAll = () =>
    fetch(`${api}/books`, {headers})
        .then(res => res.json())
        .then(data => data.books);

/**
 * @description Update book
 * @param book
 * @param shelf
 * @returns {Promise<Response | never>}
 */
export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shelf})
    }).then(res => res.json());

/**
 * @description Filter books
 * @param query
 * @returns {Promise<Response | never>}
 */
export const search = (query) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query})
    }).then(res => res.json())
        .then(data => data.books);
