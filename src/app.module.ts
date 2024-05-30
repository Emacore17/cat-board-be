import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard
} from 'nest-keycloak-connect';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ProvinceModule } from './province/province.module';
import { RegionModule } from './region/region.module';
import { SearchModule } from './search/search.module';
import { KeycloakConfigService } from './config/keycloak.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    KeycloakConnectModule.registerAsync({
      useClass: KeycloakConfigService,
      imports: [ConfigModule],
    }),
    SearchModule,
    RegionModule,
    ProvinceModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ResourceGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
