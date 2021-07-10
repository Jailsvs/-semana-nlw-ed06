import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}
export function ensureAuthenticated(request: Request,
                                     response: Response, 
                                     next: NextFunction){

    
    const authToken = request.headers.authorization;
    if (!authToken) {
        //return response.status(401).json({message: "Token missing"});
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try {
      const decode = verify(token ,"0a5d1891972ddbff26eaa3741965726c") as IPayload;
      const { sub } = decode;  

      //console.log(decode, sub);
      request.user_id = sub;

      return next();
    } catch (error) {
        return response.status(401).end();
    }  
    
}