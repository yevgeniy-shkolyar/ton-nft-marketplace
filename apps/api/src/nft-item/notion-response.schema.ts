import { Type, type Static } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export const notionResponseSchema = Type.Object({
    object: Type.Literal('list'),
    results: Type.Array(
        Type.Object({
            id: Type.String(),
            properties: Type.Object({
                'NFT Friendly Address': Type.Object({
                    id: Type.String(),
                    title: Type.Array(
                        Type.Object({
                            type: Type.String(),
                            text: Type.Object({
                                content: Type.String(),
                                link: Type.Null(),
                            }),
                        }),
                    ),
                }),
            }),
        }),
    ),
    next_cursor: Type.Union([Type.String(), Type.Null()]),
    has_more: Type.Boolean(),
});

export type NotionResponse = Static<typeof notionResponseSchema>;

export const notionResponseValidator =
    TypeCompiler.Compile(notionResponseSchema);
