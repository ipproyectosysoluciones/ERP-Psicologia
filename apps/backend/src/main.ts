import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ERP-Psicologia API')
    .setDescription(`
## English
Enterprise Resource Planning system for psychology and psychiatry clinics.

### Authentication
All endpoints (except /auth/register and /auth/login) require a Bearer token in the Authorization header.

### Roles
- ADMIN: Full access
- PSICOLOGO: Psychology professional
- PSIQUIATRA: Psychiatry professional
- SECRETARIO: Administrative staff
- USER: Basic user

---
## Español
Sistema de planificación de recursos empresariales para clínicas de psicología y psiquiatría.

### Autenticación
Todos los endpoints (excepto /auth/register y /auth/login) requieren un token Bearer en el header Authorization.

### Roles
- ADMIN: Acceso completo
- PSICOLOGO: Profesional de psicología
- PSIQUIATRA: Profesional de psiquiatría
- SECRETARIO: Personal administrativo
- USER: Usuario básico
    `)
    .setVersion('0.1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication endpoints / Endpoints de autenticación')
    .addTag('Pacientes', 'Patient management / Gestión de pacientes')
    .addTag('Historias', 'Clinical records management / Gestión de historias clínicas')
    .addTag('Health', 'Health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { font-size: 2.5em; }
    `,
    customSiteTitle: 'ERP-Psicologia API Docs',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
