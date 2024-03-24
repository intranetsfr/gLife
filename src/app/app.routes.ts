import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TechnologyComponent } from './pages/technology/technology.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { LegalComponent } from './pages/legal/legal.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pages/contact', component: ContactComponent},
    { path: 'pages/pricing', component: PricingComponent },
    { path: 'pages/technology', component: TechnologyComponent },
    { path: 'pages/teams', component: TeamsComponent },
    { path: 'pages/legal', component: LegalComponent },
    { path: 'pages/privacy', component: PrivacyComponent },
    {path: '**', component: NotFoundComponent}
];
