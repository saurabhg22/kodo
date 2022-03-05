import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Post {
    @Field()
    name: string;

    @Field()
    image: string;

    @Field()
    description: string;

    @Field()
    dateLastEdited: Date;
}

export { Post };
