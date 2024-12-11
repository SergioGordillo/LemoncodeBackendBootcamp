import {db} from "#core/servers/index.js";
import {Book} from "./book.model"; 

export const getBookContext = () => db?.collection<Book>('books'); 