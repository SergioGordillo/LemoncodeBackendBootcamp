import { mockRepository } from "./user.mock-repository.js";
//import { dbRepository } from "./user.db-repository.js";
import { envConstants } from "#core/constants/index.js";

//export const bookRepository = envConstants.isApiMock ? mockRepository : dbRepository;
export const bookRepository = mockRepository;
