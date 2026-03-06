import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { ShopProducts } from './pages/shop-products/shop-products';
import { ShopProductCreate } from './pages/shop-product-create/shop-product-create';
import { PurchaseFormComponent } from './pages/purchases/purchases';
import { SaleFormComponent } from './pages/sales/sales';
import { PromotionFormComponent } from './pages/create-promotions/create-promotions';
import { ListPromotions } from './pages/list-promotions/list-promotions';
import { ListOrdersComponent } from './pages/list-orders/list-orders';
import { Notifications } from './pages/notifications/notifications';
import { ShopNavbarComponent } from './pages/navbar-boutique/navbar-boutique';
import { DashboardBoutique } from './pages/dashboard/dashboard';
import { BoutiqueMain } from './pages/boutique-main/boutique-main';
import { LoginBoutique } from './pages/login-boutique/login-boutique';
import { CustomerOrders } from './pages/customer-orders/customer-orders';
import { Lots } from './pages/lots/lots';
import { AddLot } from './pages/lots/add/add';
import { Boutique } from './pages/boutique/boutique';
import { AddBoutique } from './pages/boutique/add-boutique/add-boutique';
import { Contrats } from './pages/contrats/contrats';
import { AddContrat } from './pages/contrats/add-contrat/add-contrat';
import { LoginClient } from './pages/login-client/login-client';
import { Register } from './pages/register/register';
import { DashboardComponent } from './pages/dashboardAdmin/dashboard';
import { PaiementFactureComponent } from './pages/paiement-facture/paiement-facture';
import { GenerateFacture } from './pages/facture/facture';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
    {path : 'client', component : ShopList},
    {path: 'login',component: LoginBoutique},
    {path: 'auth',component: LoginClient},
    {path : 'products-boutiques', component : ShopProducts},
    {path : 'create-products', component : ShopProductCreate},
    {path : 'purchase', component : PurchaseFormComponent},
    {path : 'sales', component : SaleFormComponent},
    {path : 'promo', component :  PromotionFormComponent},
    {path : 'liste-promo', component : ListPromotions},
    {path : 'liste-notif', component : Notifications},
    {path : 'liste-order', component : ListOrdersComponent},
    {path : 'navbar', component : ShopNavbarComponent},
    {path : 'dashboard', component : DashboardBoutique},
    {path : 'boutique/main', component : BoutiqueMain},
    {path : 'customer-order', component : CustomerOrders},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path : 'lots', component : Lots,canActivate: [AuthGuard]},
    {path : 'lots/add', component : AddLot,canActivate: [AuthGuard]},
    {path: 'lots/add/:id',component: AddLot,canActivate: [AuthGuard]}, 
    {path : 'boutiques', component : Boutique,canActivate: [AuthGuard]},
    {path : 'boutique/add', component : AddBoutique,canActivate: [AuthGuard]},
    {path: 'boutique/add/:id',component: AddBoutique,canActivate: [AuthGuard]},  
    {path : 'contrats', component : Contrats,canActivate: [AuthGuard]},
    {path : 'contrats/add', component : AddContrat,canActivate: [AuthGuard]},
    {path: 'contrats/add/:id',component: AddContrat,canActivate: [AuthGuard]},
    {path: 'register',component: Register},
    {path: 'facture',component: GenerateFacture,canActivate: [AuthGuard]},
    {path: 'paiement',component: PaiementFactureComponent,canActivate: [AuthGuard]},
    {path: 'dashboardAdmin',component: DashboardComponent,canActivate: [AuthGuard]}

  ];
