import { applyDecorators, UseGuards } from '@nestjs/common';

import { UserRoleGuard } from '../guards/user-role.guard';
import { Roles } from '../enum/roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '../guards/auth.guard';

/*
Es un decorador compuesto que:
Usa RoleProtected para marcar los roles requeridos en la metadata del handler.
Aplica los guards AuthGuard (autenticación) 
y UserRoleGuard (autorización por rol) a la ruta o controlador donde se use.

Lee los roles requeridos de la metadata (META_ROLES).
Si no hay roles requeridos, permite el acceso.
Si hay roles requeridos, verifica que el usuario (req.user.role) tenga al menos uno de los roles válidos.
Si no, lanza ForbiddenException.

Ej: @Auth(Roles.ADMIN)
    @Get('admin')
   */


export function Auth(...role: Roles[]) {

    return applyDecorators(
        RoleProtected(...role),
        UseGuards( AuthGuard, UserRoleGuard ),
    );
}