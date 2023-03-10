import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import ProductStore from './productStore';
import CorporateDebitStore from './corporateDebitStore';
import PersonelDebitStore from './personelDebitStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    productStore: new ProductStore(),
    corporateDebitStore: new CorporateDebitStore(),
    personelDebitStore: new PersonelDebitStore(),
  };
}
