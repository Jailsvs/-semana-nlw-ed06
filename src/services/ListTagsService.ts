import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagRepositories";
import { classToPlain } from "class-transformer"

class ListTagsService {

    async execute () {
        const tagRepository = getCustomRepository(TagsRepositories);

        /*let tags = await tagRepository.find();
        tags = tags.map((tag) => ({
            ...tag, nameCustom: `#${tag.name}`
        }));*/

        const tags = await tagRepository.find();
        return classToPlain(tags);
    }
}

export { ListTagsService }