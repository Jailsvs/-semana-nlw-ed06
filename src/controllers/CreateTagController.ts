import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {

  async handle(request: Request, response: Response) {
  
    try {
      const { name } = request.body;

      const createTagService = new CreateTagService();
      
      
      const tag = await createTagService.execute( name );
      return response.json(tag);
    } catch (error) {
      throw new Error(error.message);
      //return response.status(400).send({error: error.message} );
    }
  
  }
}

export { CreateTagController }