import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {

  async handle(request: Request, response: Response) {
  
    try {
      //const { user_id } = request;
      const listUsersService = new ListUsersService();
      
      const users = await listUsersService.execute(  );
      return response.json(users);
    } catch (error) {
      throw new Error(error.message);
    }
  
  }
}

export { ListUsersController }