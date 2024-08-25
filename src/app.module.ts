import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColorsModule } from './colors/colors.module';
import { PatternsModule } from './patterns/patterns.module';
import { SeederModule } from './seeder/seeder.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PlaygroundModule } from './playground/playground.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({}),
    WebsocketModule,
    AuthModule,
    UsersModule,
    ColorsModule,
    PatternsModule,
    SeederModule,
    PlaygroundModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useFactory: (
        jwtService: JwtService,
        reflector: Reflector,
        configService: ConfigService,
      ) => {
        return new JwtAuthGuard(jwtService, reflector, configService);
      },
      inject: [JwtService, Reflector, ConfigService],
    },
  ],
})
export class AppModule {
  configureWebSocketAdapter() {
    const app = this as any;
    app.useWebSocketAdapter(new IoAdapter(app));
  }
}
