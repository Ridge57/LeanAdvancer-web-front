import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChecklistTachesnokComponent } from './checklist-tachesnok/checklist-tachesnok.component';
import { ChecklistHistoriqueComponent } from './checklist-historique/checklist-historique.component';
import { ChecklistVoirComponent } from './checklist-voir/checklist-voir.component';
import { IrritantEncoursComponent } from './irritant-encours/irritant-encours.component';
import { IrritantAtraiterComponent } from './irritant-atraiter/irritant-atraiter.component';
import { IrritantSoldesComponent } from './irritant-soldes/irritant-soldes.component';
import { StandardAjouterComponent } from './standard-ajouter/standard-ajouter.component';
import { StandardVoirComponent } from './standard-voir/standard-voir.component';
import { StandardRectifierComponent } from './standard-rectifier/standard-rectifier.component';
import { SuggestionAtraiterComponent } from './suggestion-atraiter/suggestion-atraiter.component';
import { SuggestionSoldesComponent } from './suggestion-soldes/suggestion-soldes.component';
import { SuggestionEncoursComponent } from './suggestion-encours/suggestion-encours.component';
import { CategoriesComponent } from './categories/categories.component';
import { ZonesComponent } from './zones/zones.component';
import { UsersComponent } from './users/users.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';


const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'checklistTachesNok',component:ChecklistTachesnokComponent},
  {path:'checklistHistorique',component:ChecklistHistoriqueComponent},
  {path:'checklistVoir',component:ChecklistVoirComponent},
  {path:'irritantATraiter',component:IrritantAtraiterComponent},
  {path:'irritantEnCours',component:IrritantEncoursComponent},
  {path:'irritantSoldes',component:IrritantSoldesComponent},
  {path:'standardAjouter',component:StandardAjouterComponent},
  {path:'standardVoir',component:StandardVoirComponent},
  {path:'standardRectifier',component:StandardRectifierComponent},
  {path:'suggestionATraiter',component:SuggestionAtraiterComponent},
  {path:'suggestionEnCours',component:SuggestionEncoursComponent},
  {path:'suggestionSoldes',component:SuggestionSoldesComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'zones',component:ZonesComponent},
  {path:'users',component:UsersComponent},
  {path:'personnaliser',component:PersonnaliserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
