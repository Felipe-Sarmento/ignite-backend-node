import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUserCase {
  async execute({username, password}: IAuthenticateClient) {


    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if(!client) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch) {
      throw new Error("Username or password mismatch");
    }

    const token = sign({ username }, "batatafrita", {subject: client.id,
    expiresIn: "1d"});

    return token;
  }
}
