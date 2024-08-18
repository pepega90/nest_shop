import { Module } from '@nestjs/common';
import { HashingProvider } from './providers/hashing.provider.js';
import { BcryptProvider } from './providers/bcrypt.provider.js';

@Module({
  providers: [{
    provide: HashingProvider,
    useClass: BcryptProvider
  }],
  exports: [HashingProvider]
})
export class AuthModule {}
