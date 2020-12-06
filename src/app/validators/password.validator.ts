import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PasswordValidator {
    isValid(password, confirm) {
        if (this.passwordsMatch(password, confirm)) {
            return true;
        }
        return false;
    }

    passwordsMatch(password, confirm) {
        return password === confirm;
    }
}