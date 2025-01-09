import { registerEnumType } from '@nestjs/graphql';

export enum Resolution {
    X5,
    X100,
    X500,
    X1500,
}

registerEnumType(Resolution, {
    name: 'Resolution',
});
