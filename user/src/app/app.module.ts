import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Router, Routes } from "@angular/router"; 
// External

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BecomeAnAuthorComponent } from './become-an-author/become-an-author.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerComponent } from './seller/seller.component';
import { SettingsComponent } from './settings/settings.component';
import { CareersComponent } from './careers/careers.component';
import { CreateGigComponent } from './create-gig/create-gig.component';
import { ErrorComponent } from './error/error.component';
import { AccountDeletedComponent } from './account-deleted/account-deleted.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditGigComponent } from './edit-gig/edit-gig.component';
import { GigDetailsComponent } from './gig-details/gig-details.component';
import { InboxComponent } from './inbox/inbox.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { FinancialsComponent } from './financials/financials.component';
import { AccountComponent } from './account/account.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account-deleted',
    component: AccountDeletedComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'become-an-author',
    component: BecomeAnAuthorComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'seller',
    component: SellerComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'create-gig',
    component: CreateGigComponent
  },
  {
    path: 'gig',
    component: GigDetailsComponent
  },
  {
    path: 'withdrawals',
    component: WithdrawalsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
        {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
        },
        {
            path: 'account',
            component: AccountComponent,
        },
        {
            path: 'profile',
            component: ProfileComponent,
        },
        {
            path: 'password',
            component: PasswordComponent,
        },
        {
            path: 'financials',
            component: FinancialsComponent,
        },
        {
            path: 'email-notifications',
            component: EmailNotificationsComponent,
        },
    ]
},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    HowItWorksComponent,
    BecomeAnAuthorComponent,
    HelpComponent,
    AboutComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    DashboardComponent,
    SellerComponent,
    SettingsComponent,
    CareersComponent,
    CreateGigComponent,
    ErrorComponent,
    AccountDeletedComponent,
    CheckoutComponent,
    EditGigComponent,
    GigDetailsComponent,
    InboxComponent,
    ManageOrdersComponent,
    ManageSalesComponent,
    FavoritesComponent,
    WithdrawalsComponent,
    ProfileComponent,
    PasswordComponent,
    FinancialsComponent,
    AccountComponent,
    EmailNotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
