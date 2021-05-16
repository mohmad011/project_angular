// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsListComponent } from './list/list.component';
// Components
// Auth

const routes: Routes = [
    {
        path: "",
        children: [




        ],
    },
];

@NgModule({
    // imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
