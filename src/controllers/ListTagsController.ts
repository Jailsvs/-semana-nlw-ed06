import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {

  async handle(request: Request, response: Response) {
  
    try {
      //const { user_id } = request;
      const listTagsService = new ListTagsService();
      
      const tags = await listTagsService.execute(  );
      return response.json(tags);
    } catch (error) {
      throw new Error(error.message);
    }
  
  }
}

export { ListTagsController }