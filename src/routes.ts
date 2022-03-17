import { Router } from "express";

import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";

import { CreateClientController } from "./modules/clients/useCases/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/CreateDeliverymanController";
import { CreateDeliveryController } from "./modules/deliveries/createDelivery/CreateDeliveryController";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAthenticateDeliveryman";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

const authenticateClientController = new AuthenticateClientController(); 
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

routes.post("/deliveryman/", createDeliverymanController.handle);
routes.post("/client", createClientController.handle);
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

//routes.get("/delivery/available", ensureAuthenticateDeliveryman, )

export { routes };