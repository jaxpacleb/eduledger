import { fieldValidator } from '../../utils/fieldValidator';
import { test, expect, describe } from 'vitest'

describe('ADD ACCOUNT FIELD VALIDATION', () => {
    // INVALID FIELD VALIDATION
    describe('Required Field Check', () => {
        test.each([
            { field: 'firstName', expected: 'First name is required!' },
            { field: 'middleName', expected: 'Middle name is required!' },
            { field: 'lastName', expected: 'Last name is required!' },
            { field: 'username', expected: 'Username is required!' },
            { field: 'password', expected: 'Password is required!' },
        ])('dapat mag-require ng $field', ({ field, expected }) => {
            expect(fieldValidator(field, '')).toBe(expected);
        });
    })

    describe('Password Matching Validation', () => {
        test()
    })

    describe('Length Boundary Checks', () => {
        test('username should fail when shorter than 8 or longer than 12', () => {
            const errorMsg = 'Username should not be less than 8 characters and not greater than 12 characters!';
            expect(fieldValidator('username', 'asdasda')).toBe(errorMsg);       // 7 chars
            expect(fieldValidator('username', 'asdasdaaaaaaa')).toBe(errorMsg); // 13 chars
        });

        test('password should fail when shorter than 8 characters', () => {
            const errorMsg = 'Password should not be less than 8 characters and not greater than 12 characters!';
            expect(fieldValidator('password', 'asdasd')).toBe(errorMsg); // 6 chars
        });
    })
}
)

