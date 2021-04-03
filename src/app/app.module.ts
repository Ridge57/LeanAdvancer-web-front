import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { ChecklistTachesnokComponent } from './checklist-tachesnok/checklist-tachesnok.component';
import { ChecklistHistoriqueComponent } from './checklist-historique/checklist-historique.component';
import { ChecklistTabmenuComponent } from './checklist-tabmenu/checklist-tabmenu.component';
import {CarouselModule} from 'primeng/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistVoirComponent } from './checklist-voir/checklist-voir.component';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrritantTabmenuComponent } from './irritant-tabmenu/irritant-tabmenu.component';
import { IrritantEncoursComponent } from './irritant-encours/irritant-encours.component';
import { IrritantAtraiterComponent } from './irritant-atraiter/irritant-atraiter.component';
import { IrritantSoldesComponent } from './irritant-soldes/irritant-soldes.component';
import { StandardTabmenuComponent } from './standard-tabmenu/standard-tabmenu.component';
import { StandardAjouterComponent } from './standard-ajouter/standard-ajouter.component';
import { StandardVoirComponent } from './standard-voir/standard-voir.component';
import { StandardRectifierComponent } from './standard-rectifier/standard-rectifier.component';
import {FileUploadModule} from 'primeng/fileupload';
import {AccordionModule} from 'primeng/accordion';
import { SuggestionTabmenuComponent } from './suggestion-tabmenu/suggestion-tabmenu.component';
import { SuggestionAtraiterComponent } from './suggestion-atraiter/suggestion-atraiter.component';
import { SuggestionEncoursComponent } from './suggestion-encours/suggestion-encours.component';
import { SuggestionSoldesComponent } from './suggestion-soldes/suggestion-soldes.component';
import { CategoriesComponent } from './categories/categories.component';
import { ZonesComponent } from './zones/zones.component';
import { UsersComponent } from './users/users.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';
import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConnexionComponent } from './connexion/connexion.component';
import { GlobalVariablesService } from 'src/services/globalvar.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavigationComponent,
    TopNavigationComponent,
    ChecklistTachesnokComponent,
    ChecklistHistoriqueComponent,
    ChecklistTabmenuComponent,
    ChecklistVoirComponent,
    IrritantTabmenuComponent,
    IrritantEncoursComponent,
    IrritantAtraiterComponent,
    IrritantSoldesComponent,
    StandardTabmenuComponent,
    StandardAjouterComponent,
    StandardVoirComponent,
    StandardRectifierComponent,
    SuggestionTabmenuComponent,
    SuggestionAtraiterComponent,
    SuggestionEncoursComponent,
    SuggestionSoldesComponent,
    CategoriesComponent,
    ZonesComponent,
    UsersComponent,
    PersonnaliserComponent,
    ConnexionComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    MenuModule,
    TabMenuModule,
    CarouselModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    AccordionModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr' },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    GlobalVariablesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
