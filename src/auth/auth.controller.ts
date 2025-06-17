import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  createUser( @Body() createUserDto: CreateUserDto)  {
    return this.client.send('register.user', createUserDto )
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) 
  }

  @UseGuards( AuthGuard )
  @Post('login')
  loginUser( @Body() loginUserDto: LoginUserDto ) { 
    return this.client.send('login.user', loginUserDto)
    .pipe(  
      catchError(error => {
        throw new RpcException(error);
      }),
    ); 
  }

 @UseGuards( AuthGuard )
  @Get('verify')
  verifyToken( @User() user: CurrentUser, @Token() token: string  ) {

    return { user, token }
  }


}
