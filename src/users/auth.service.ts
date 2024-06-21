import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }


    async signUp(email: string, password: string) {
        // See if email already exist
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('Email already in use');
        }
        // Hash password

        // ? HASH PASSWORD :- GET SALT
        // 8 :- buffer of 8 bytes
        // HEX :- 8 bytes so 'hex' hence 2 char
        // 16 cahrters are of the salt
        const salt = randomBytes(8).toString('hex');
        // ! Testing logs :- console.log('salt', salt);
        // ? HASH PASSWORD :- hash salt and password 
        // 32 chars of the salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // ! Testing logs :- console.log('hash', hash);
        // ? HASH PASSWORD :- join the result
        const result = salt + '.' + hash.toString('hex');
        // ! Testing logs :- console.log('res', result);
        // Create new user and save to db
        const user = await this.userService.create(email, result);
        // Return user
        return user;
    }

    signIn() { }
}