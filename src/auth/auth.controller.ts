import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createUser( @Body() createUserDto: CreateUserDto)  {
    return this.client.send('create/user', createUserDto )
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) 
  }

  @Post()
  loginUser( @Body() loginUserDto: LoginUserDto ) {
    return this.client.send('login/user', loginUserDto )
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    ) ; 
  }

  @Get('verify')
  verifyToken() {
    return this.client.send('auth.verify.token', {}); 
  }




}
