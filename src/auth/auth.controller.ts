import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ChangePasswordDto, CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from './dto';
import { catchError } from 'rxjs';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';
import { PaginationDto } from '../common';
import { Auth } from './decorators/auth.decorator';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  
  @Post('register')
  createUser( @Body() createUserDto: CreateUserDto)  {
    return this.client.send('register.user', createUserDto)
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) 
  }

  @Post('confirm')
  async confirmAccount(@Body() confirmAccountDto: ConfirmAccountDto) {
    return this.client.send('auth.confirm', confirmAccountDto).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  loginUser( @Body() loginUserDto: LoginUserDto ) { 
    return this.client.send('login.user', loginUserDto)
    .pipe(  
      catchError(error => {
        throw new RpcException(error);
      }),
    ); 
  }

 @Auth()
  @Get('verify')
  verifyToken( @User() user: CurrentUser, @Token() token: string  ) {

    return { user, token }
  }


  @Auth()
  @Get('getAll')
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send('get.all.users', paginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        }),
      );
  }

 
  // Cambio de contraseña autenticado
  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    const userId = req['user'].id;
    return this.client.send('auth.change-password', { userId, dto });
  }

  // Forgot password (email)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.client.send('auth.forgot-password', dto);
  }

  // Reset password (token del email)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.client.send('auth.reset-password', dto);
  }
}


