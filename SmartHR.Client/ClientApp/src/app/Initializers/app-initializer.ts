import { Promise } from 'es6-promise'
import { AuthenticationService } from "../services/authentication/authentication.service";
export function appInitializer(authenticationService: AuthenticationService) {

    return () => new Promise(resolve => {
      // attempt to refresh token on app start up to auto authenticate
      
    });
 
}
