import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticasteRequest{
    email: string,
    password: string
}

class AuthenticateUserService{

    async execute({ email, password }:  IAuthenticasteRequest){
        
        
        const usersRepository  = getCustomRepository(UsersRepositories);
      
        if (!email){
            throw new Error("Email invalid");
        }
        
        const user = await usersRepository.findOne({
            email
        });
       
        if (!user) {
            throw new Error("Email/Password incorrect");
        }
        
        const passwordMatch = await compare(password, user.password? user.password : "");
        
        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign(
            {
                email: user.email
            },
            "0a5d1891972ddbff26eaa3741965726c",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token;
    }

} 

export { AuthenticateUserService }