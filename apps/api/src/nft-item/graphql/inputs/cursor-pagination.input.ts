import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

const MAX_PAGE_SIZE = 5;

@InputType()
export class CursorPaginationInput {
    @Field(() => Int, { defaultValue: MAX_PAGE_SIZE })
    @IsInt({ message: 'Check that $property is Integer' })
    @Max(MAX_PAGE_SIZE, {
        message: 'The limit cannot exceed the maximum page size.',
    })
    @Min(0, { message: 'The limit must be at least 0.' })
    limit!: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUUID()
    cursor?: string;
}
