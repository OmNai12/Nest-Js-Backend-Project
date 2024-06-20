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
    async create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return await this.repo.save(user);
    }

    /**
     * One purticular user
     * @param id 
     * @returns 
     */
    async findOne(id: number) {
        return await this.repo.findOneBy({ id });
    }

    /**
     * 
     * @param email 
     * @returns 
     */
    async find(email: string) {
        return await this.repo.find({ where: { email } });
    }

    /**
     * 
     * @param id 
     * @param attrs 
     * @returns 
     */
    async update(id: number, attrs: Partial<User>) {
        // Partial means any or none of the properties of the USER class
        // Reason we might only need to update only email or only password or both so that need to be handled
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.repo.remove(user);
    }
}
