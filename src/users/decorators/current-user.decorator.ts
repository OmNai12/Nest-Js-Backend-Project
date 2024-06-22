import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// createParamDecorator is used to create custom decorator
export const CurrentUser = createParamDecorator(
    // Whatever arguments passed will go in the data argument of the function
    // never :- no arguments to be provided if done red wavey line
    (data: never, context: ExecutionContext) => {
        // Execution Context works with any kind of communication protocol eg :- HTTP, graphQL, gRPC etc
        // Execution Context is wrapper around incoming request
        const req = context.switchToHttp().getRequest();
        return req.currentUser;
    }
);