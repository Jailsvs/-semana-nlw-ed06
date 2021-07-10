import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentRepositories";

class ListUserReceiveComplimentsService {

    async execute (user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentRepository.find({
            where: {
                user_receiver: user_id 
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }