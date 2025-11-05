export enum Messages {
    GeneralSuccess = 'Запит виконано успішно',
    GeneralError = 'Сталася помилка при обробці запиту сервером.',
    EntityWithIdDoesntExists = 'Сутності з таким id не існує',
    FieldInvalidId = `Поле '{field}' містить id неіснуючої сутності`,
    FieldInvalidInt32 = `Поле '{field}' не є числом з допустимого діапазону`,
}
