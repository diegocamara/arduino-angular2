import { Routes, RouterModule } from '@angular/router';
import { IotDashboardComponent } from "app/pages/iot-dashboard/iot-dashboard.component";
import { ModuleWithProviders } from "@angular/core";
import { ThingsDiagramComponent } from "app/pages/things-diagram/things-diagram.component";
import { BrokerTopicsComponent } from "app/pages/broker-topics/broker-topics.component";
import { NodemcuComponent } from "app/pages/thingscontrollers/nodemcu/nodemcu.component";

const APP_ROUTES: Routes = [
    {
        path: '',
        component: IotDashboardComponent,
        children: [
            {
                path: 'thingsDiagram',
                component: ThingsDiagramComponent,
                children: [
                    {
                        path: 'nodemcu/:id',
                        component: NodemcuComponent
                    }
                ]
            },
            {
                path: 'brokerTopics',
                component: BrokerTopicsComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);