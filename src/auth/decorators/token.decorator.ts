import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

/*   Decorator para obtener el token del request
Este decorador se usa para extraer el token del request después de que el AuthGuard
lo haya verificado y agregado al request.
Si el token no está presente, lanza un InternalServerErrorException. */

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {


    const request = ctx.switchToHttp().getRequest();

    if ( !request.token ) {
      throw new InternalServerErrorException('Token not found in request (AuthGuard called?)');
    }

    return request.token;
  },
);