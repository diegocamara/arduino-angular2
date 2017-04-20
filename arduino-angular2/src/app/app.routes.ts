import { Routes, RouterModule } from '@angular/router';
import { IotDashboardComponent } from "app/pages/iot-dashboard/iot-dashboard.component";
import { ModuleWithProviders } from "@angular/core";
import { ThingsDiagramComponent } from "app/pages/things-diagram/things-diagram.component";

const APP_ROUTES: Routes = [
    {
        path: '',
        component: IotDashboardComponent,
        children: [
            {
                path: '',
                component: ThingsDiagramComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);