import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

/*  
  Decorator para obtener el usuario del request
Este decorador se usa para extraer el usuario del request después de que el AuthGuard
lo haya verificado y agregado al request.
Si el usuario no está presente, lanza un InternalServerErrorException. */     

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {


    const request = ctx.switchToHttp().getRequest();


    if ( !request.user ) {
      throw new InternalServerErrorException('User not found in request');
    }

    return request.user;
  },
);