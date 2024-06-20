import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    // InjectRepository DI system needs the type of USER
    // DI is not good ith genrics type so the decorator is there
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    /**
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }
}
