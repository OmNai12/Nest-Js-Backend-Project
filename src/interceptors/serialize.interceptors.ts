import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
// ! Old implementation :- import { UserDto } from "src/users/dtos/user.dto";

// Custom decorator
export function Serialize(dto: any) {
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Incoming then play with context
        // This is working before it goes to targeted route handler
        // console.log('I am running before route handle called : ', context);

        // Outgoing then next
        // That is before response is displayed to the user
        return next.handle().pipe(
            // data will have the user data which we get in the json
            map((data: any) => {
                // console.log('Running before response is displayed : ', data);
                return plainToInstance(this.dto, data, {
                    // Extrenous will be deleted
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}