import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UsersService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        // async intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const { userId } = req.session || {};;
        if (userId) {
            const user = await this.userService.findOne(userId);
            req.CurrentUser = user;
        }

        // Simply communicate to the route handler
        return next.handle();
    }
}