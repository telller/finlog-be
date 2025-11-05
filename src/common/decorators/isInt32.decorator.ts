import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Messages } from '@src/common/constants/messages';

const maximumInt32 = 2_147_483_647;
const minimumInt32 = 0;

@ValidatorConstraint({ name: 'IsInt32', async: false })
export class IsInt32Constraint implements ValidatorConstraintInterface {
    validate(value: number): boolean {
        return value <= maximumInt32 && value >= minimumInt32;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return Messages.FieldInvalidInt32.replace('{field}', validationArguments?.property || '');
    }
}

export function IsInt32(validationOptions?: ValidationOptions) {
    function isInt32(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsInt32',
            async: false,
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsInt32Constraint,
        });
    }
    return isInt32;
}
