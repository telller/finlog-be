import {
    isUUID,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { TagDbRepository } from '@src/database/repository';
import { Injectable } from '@nestjs/common';
import { Messages } from '@src/common/constants/messages';

@ValidatorConstraint({ name: 'IsValidTagId', async: true })
@Injectable()
export class IsValidTagIdConstraint implements ValidatorConstraintInterface {
    constructor(private readonly tagDbRepository: TagDbRepository) {}

    async validate(tagId: string): Promise<boolean> {
        if (!isUUID(tagId)) return true;
        const res = await this.tagDbRepository.getTagById(tagId);
        return !!res;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return Messages.FieldInvalidId.replace('{field}', validationArguments?.property || '');
    }
}

export function IsValidTagId(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsValidTagId',
            async: true,
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidTagIdConstraint,
        });
    };
}
