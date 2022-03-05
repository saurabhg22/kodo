import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { Post } from '../post.schema';

@InputType()
export class SearchPostOptions {
    @IsOptional()
    @IsEnum({ name: 'name', dateLastEdited: 'dateLastEdited' })
    @Field({ nullable: true })
    sort?: 'name' | 'dateLastEdited';

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    page?: number;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    itemsPerPage?: number;
}

@InputType()
export class SearchPostQueryDTO {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    query?: string = '';

    @Field(() => SearchPostOptions, { nullable: true })
    @IsOptional()
    options?: SearchPostOptions;
}

@ObjectType()
export class SearchPostResponseDTO {
    @Field()
    @IsNumber()
    total: number;

    @Field()
    @IsNumber()
    page: number;

    @Field(() => [Post])
    @IsNumber()
    results: Post[];
}
