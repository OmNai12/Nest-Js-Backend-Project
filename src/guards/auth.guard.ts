import { ExecutionContext } from "@nestjs/common";
import { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }

}