import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
        authServerUrl: this.configService.get<string>('KEYCLOAK_HOST'),
        realm: this.configService.get<string>('KEYCLOAK_REALM'),
        clientId: this.configService.get<string>('KEYCLOAK_CLIENT'),
        secret: this.configService.get<string>('KEYCLOAK_SECRET'),
        // policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        // tokenValidation: TokenValidation.ONLINE,
    };
  }
}