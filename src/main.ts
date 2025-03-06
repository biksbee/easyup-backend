import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 30111;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Easyup')
    .setDescription('Easyup documentation')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);


  await app.listen(PORT, async () => {
    console.log(`Swagger docs: http://localhost:${PORT}/api/docs`)
    console.log(`Listen port ${PORT}`)
  });
}
bootstrap();
