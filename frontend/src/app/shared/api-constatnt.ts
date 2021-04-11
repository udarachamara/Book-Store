export const Api = {

    USER: {
        PREFIX: 'user',
        LOGIN: '/login'
    },

    BOOK: {
        PREFIX: 'book',
        ACTIVE_BOOK: '/get_book_by',
        SEARCH_BOOK: '/search',
        BY_AUTHOR: '/show_books_by_author',
        BY_ACTIVE_AUTHORS: '/active_authors_book'
    },

    AUTHOR: {
        PREFIX: 'author',
        MY_BOOK: '/book',
        INACTIVE: '/inactive'
        
    }

}