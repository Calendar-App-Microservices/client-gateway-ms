import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/roles.enum';

/* Decorator para proteger rutas por roles
 Este decorador se usa para marcar los roles requeridos en la metadata del handler.
 Luego, el guard UserRoleGuard verifica si el usuario tiene al menos uno de los roles
 especificados en la metadata.
    Ejemplo de uso:
     @RoleProtected(Roles.ADMIN, Roles.USER)
     @Get('admin') */

export const META_ROLES = 'role';

export const RoleProtected = (...args: Roles[]) => {

    return SetMetadata( META_ROLES, args);
}