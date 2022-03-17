import { AuthenticateClientUserCase } from "./AuthenticateClientUserCase";
import { Request, Response } from "express";


export class AuthenticateClientController {
  async handle (request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClientUseCase = new AuthenticateClientUserCase();
    const result = await authenticateClientUseCase.execute({
      username,
      password
    })

    return response.json(result) 
  }
}