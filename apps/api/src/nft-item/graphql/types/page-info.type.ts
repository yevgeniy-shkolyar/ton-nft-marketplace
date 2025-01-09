import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfoType {
    @Field(() => ID, { description: 'The end cursor.', nullable: true })
    endCursor?: string;

    @Field(() => Boolean, { description: 'Whether there is a next page.' })
    hasNextPage!: boolean;
}
