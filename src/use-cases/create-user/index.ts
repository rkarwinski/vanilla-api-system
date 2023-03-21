import { CreateUserUseCase } from "./create-user-use-cases";
import { CreateUserController } from "./create-user-controller";
import { InMemoryUsersRepository } from "../../repositories/implementations/in-memory-users-repository";
import { MailtrapMailProvider } from "../../providers/implementations/mailtrap-mail-provider";

const inMemoryUsersRepository = new InMemoryUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
    inMemoryUsersRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController }