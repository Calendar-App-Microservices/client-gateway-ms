import { CanActivate, ExecutionContext, BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector      } from '@nestjs/core';
import { Observable     } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { CreateUserDto } from '../dto';


/*     Guard que se encarga de ver el usuario y si tiene los roles
        necesarios para acceder a la ruta o controlador.
Este guard se usa junto con el decorador @RoleProtected para proteger rutas por roles.
Si el usuario no tiene un rol válido, lanza una ForbiddenException.
Si el usuario no está presente en el request, lanza una BadRequestException.
Si no hay roles requeridos, permite el acceso sin restricciones.
Si hay roles requeridos, verifica que el usuario tenga al menos uno de los roles válidos.
Si el usuario tiene un rol válido, permite el acceso a la ruta o controlador. 
 Ejemplo de uso:
 @RoleProtected(Roles.ADMIN, Roles.USER)
 @Get('admin')
 @Auth(Roles.ADMIN)

*/

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const validRoles: string[] =  this.reflector.get( META_ROLES, context.getHandler())

        if ( !validRoles ) return true;
        if ( validRoles.length === 0 ) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user as CreateUserDto;
        
        if ( !user )
            throw new BadRequestException('User not found');

        for ( const roles of user.role ) {
            if ( validRoles.includes( roles )) {
                return true;
            }
        }

        throw new ForbiddenException(
            `User ${ user.email } need a valid role: [${ validRoles }]`
        );
    }
}