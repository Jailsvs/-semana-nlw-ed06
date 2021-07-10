import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

  async handle(request: Request, response: Response) {
  
    try {
      const { name, email, admin, password } = request.body;

      const createUserService = new CreateUserService();
      
      
      const user = await createUserService.execute( { name, email, admin, password } );
      return response.json(user);
    } catch (error) {
      throw new Error(error.message);
      //return response.status(400).send({error: error.message} );
    }
  
  }
}

export { CreateUserController }