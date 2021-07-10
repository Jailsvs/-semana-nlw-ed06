import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentRepositories";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository       = getCustomRepository(UsersRepositories);

    if (!tag_id) {
      throw new Error("Tag incorrect");
    }

    if (!user_receiver) {
      throw new Error("User Receiver incorrect");
    }

    if (user_sender === user_receiver) {
      throw new Error("Users Sender and Receiver are the same!")
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver); 
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!")
    }

    const compliment = complimentsRepository.create({
      tag_id, user_sender, user_receiver, message
    });

    await complimentsRepository.save(compliment);

    return compliment;

  }
}

export{ CreateComplimentService };