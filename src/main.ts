import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  console.log(process.argv);
  if (process.argv.includes('--seed')) {
    await seedService.seedAll();
  } else if (process.argv.includes('--reseed')) {
    await seedService.reseed();
  }
  await app.listen(3000);
}
bootstrap();
