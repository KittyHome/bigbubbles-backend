import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BigBubbles API Documentation')
    .setDescription(
      'Comprehensive documentation for the BigBubbles API, detailing all available endpoints, request/response formats, and authentication methods.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
