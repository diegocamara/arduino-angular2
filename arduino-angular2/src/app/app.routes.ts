import { Routes, RouterModule } from '@angular/router';
import { IotDashboardComponent } from "app/pages/iot-dashboard/iot-dashboard.component";
import { ModuleWithProviders } from "@angular/core";

const APP_ROUTES: Routes = [
    {
        path: '',
        component: IotDashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);