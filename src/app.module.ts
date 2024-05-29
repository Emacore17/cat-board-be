import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  KeycloakConnectModule
} from 'nest-keycloak-connect';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ProvinceModule } from './province/province.module';
import { RegionModule } from './region/region.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:9080/auth',
      realm: 'cat-realm',
      clientId: 'nestjs',
      secret: 'qai6MweZkf3NzUOk8aMLjQlNBD8hpZLr',
      // Secret key of the client taken from keycloak server
    }),
    SearchModule,
    RegionModule,
    ProvinceModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
