   export function fieldValidator(name, value) {
        const fieldValue = value.trim()
        let errorMsg = ''

        switch (name) {
            case 'firstName':
                if (!fieldValue)
                    errorMsg = 'First name is required!'
                break;
            case 'middleName':
                if (!fieldValue)
                    errorMsg = 'Middle name is required!'
                break;
            case 'lastName':
                if (!fieldValue)
                    errorMsg = 'Last name is required!'
                break;
            case 'username':
                if (!fieldValue)
                    errorMsg = 'Username is required!'
                else if (fieldValue.length <= 8 || fieldValue.length >= 12)
                    errorMsg = 'Username should not be less than 8 characters and not greater than 12 characters!'
                break;
            case 'password':
                if (!fieldValue)
                    errorMsg = 'Password is required!'
                else if (fieldValue.length <= 8 || fieldValue.length >= 12)
                    errorMsg = 'Password should not be less than 8 characters and not greater than 12 characters!'
                break;
        }

        return errorMsg;
    }