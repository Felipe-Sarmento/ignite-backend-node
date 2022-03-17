import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUserCase {
  async execute({username, password}: IAuthenticateDeliveryman) {


    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(!deliveryman) {
      throw new Error("Deliveryman not found");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error("Username or password mismatch");
    }

    const token = sign({ username }, "limaocommel", {subject: deliveryman.id,
    expiresIn: "1d"});

    return token;
  }
}
