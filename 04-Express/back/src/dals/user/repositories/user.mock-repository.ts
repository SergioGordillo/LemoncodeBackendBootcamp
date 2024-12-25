import { UserRepository } from "./user.repository";
import { db } from "../../mock-data.js"


export const mockRepository: UserRepository = {
    getUserByEmailAndPassword: async (email: string, password: string) => {
        const user = db.users.find(u => u.email === email && u.password === password);

        if(!user){
            throw new Error("User not found");
        };

        return user;
    }
}