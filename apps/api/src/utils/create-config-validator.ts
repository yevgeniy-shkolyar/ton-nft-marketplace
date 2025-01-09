import { Static, TObject } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

type Validator<T extends TObject> = (
    values: Record<string, unknown>,
) => Static<T>;

export function createConfigValidator<T extends TObject>(
    schema: T,
): Validator<T> {
    type ConfigSchema = Static<T>;
    const validator = TypeCompiler.Compile(schema);

    return (values: Record<string, unknown>): ConfigSchema => {
        if (validator.Check(values)) {
            return values;
        }
        const errors = [...validator.Errors(values)];
        console.error(errors);
        throw new Error('Invalid configuration');
    };
}
