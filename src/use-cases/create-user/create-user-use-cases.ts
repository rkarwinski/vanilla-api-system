import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/I-mail-provider";
import { IUsersRepository } from "../../repositories/I-users-repository";
import { ICreateUserDto } from "./create-user-dto";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserDto) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }

        const user = new User(data);

        await this.userRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Rodrigo',
                email: 'rk@rodrigokarwinski.com.br',
            },
            subject: 'Teste de envio',
            body: '<p> Aoba!!! </p>',
        });
    }
}