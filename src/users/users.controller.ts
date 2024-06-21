import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializerInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService) { }

    /**
     * 
     * @param body 
     */
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.userService.create(body.email, body.password);
    }

    // Now, here we return password to so we need to remove that so we use iterceptors
    // ! Old Implementation :- @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(new SerializerInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user;
    }

    @Get()
    async findAllUsers(@Query('email') email: string) {
        return await this.userService.find(email);
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        return await this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(parseInt(id), body);
    }

}
