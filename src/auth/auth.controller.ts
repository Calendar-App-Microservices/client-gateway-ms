import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { catchError } from 'rxjs';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';
import { PaginationDto } from '../common';
import { Auth } from './decorators/auth.decorator';

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


}
