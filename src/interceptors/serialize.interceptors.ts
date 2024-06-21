import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class SerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Incoming then play with context
        // This is working before it goes to targeted route handler
        console.log('I am running before route handle called : ', context);

        // Outgoing then next
        // That is before response is displayed to the user
        return next.handle().pipe(
            map((data: any) => {
                console.log('Running before response is displayed : ', data);
            }),
        );
    }
}