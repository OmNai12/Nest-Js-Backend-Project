import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    // ! Old Implementation 
    // /**
    //  * 
    //  * @param session 
    //  * @returns 
    //  */
    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     return this.userService.findOne(session.userId);
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: string) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user
    }

    // Now, here we return password to so we need to remove that so we use iterceptors
    // ! Old Implementation :- @UseInterceptors(ClassSerializerInterceptor)
    // ! Old Implementation (2) :- @UseInterceptors(new SerializerInterceptor(UserDto))
    // Using custom decorator
    // @Serialize(UserDto)
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
