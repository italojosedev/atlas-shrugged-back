import { Application } from 'express';

import ErrorHandler from '@config/errors/ErrorHandler';
import UserRoutes from './organization/UserRoutes';
import AuthRoutes from './organization/AuthRoutes';
import ProductRoutes from './organization/ProductRoutes';
import ProviderRoutes from './organization/ProviderRoutes';
import QuotationRoutes from './organization/QuotationRoutes';
import OrganizationRoutes from './organization/OrganizationRoutes';
import PurchaseOrderRoutes from './organization/PurchaseOrderRoutes';
// provider
import ProviderOrganizationRoutes from './provider/OrganizationRoutes';
import ProviderProductRoutes from './provider/ProductRoutes';
import CustomerRoutes from './provider/CustomerRoutes';
import ProviderQuotationRoutes from './provider/QuotationRoutes';
import ProviderPurchaseOrderRoutes from './provider/PurchaseOrderRoutes';
// commons
import CategoryRoutes from './CategoryRoutes';
import BrandRoutes from './BrandRoutes';
import CommonsProductRoutes from './ProductRoutes';
import ImageRoute from './ImageRoute';

const API_ORGANIZATION = '/api/organization';
const API_PROVIDER = '/api/provider';
const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    // commons routes
    app.use(API, AuthRoutes.getRoutes());
    app.use(API, CategoryRoutes.getRoutes());
    app.use(API, BrandRoutes.getRoutes());
    app.use(API, CommonsProductRoutes.getRoutes());
    app.use(API, ImageRoute.getRoutes());
    // organization routes
    app.use(API_ORGANIZATION, UserRoutes.getRoutes());
    app.use(API_ORGANIZATION, ProductRoutes.getRoutes());
    app.use(API_ORGANIZATION, ProviderRoutes.getRoutes());
    app.use(API_ORGANIZATION, QuotationRoutes.getRoutes());
    app.use(API_ORGANIZATION, OrganizationRoutes.getRoutes());
    app.use(API_ORGANIZATION, PurchaseOrderRoutes.getRoutes());
    // provider routes
    app.use(API_PROVIDER, ProviderOrganizationRoutes.getRoutes());
    app.use(API_PROVIDER, ProviderProductRoutes.getRoutes());
    app.use(API_PROVIDER, CustomerRoutes.getRoutes());
    app.use(API_PROVIDER, ProviderQuotationRoutes.getRoutes());
    app.use(API_PROVIDER, ProviderPurchaseOrderRoutes.getRoutes());
    // error handling
    app.use(ErrorHandler.use);
  }
}

export default new Routes();
