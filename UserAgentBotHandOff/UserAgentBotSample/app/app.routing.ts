import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UsersComponent } from './user/index';
import { ForgotPasswordComponent } from './forgotpassword/index';
import { AuthGuard } from './_guards/auth.guard';

import { QuesAnswerComponent } from './admin/quesanswer/index';

import {
    AdminComponent, AccountComponent, AgentComponent, AnalyticsComponent,
    BannedComponent, DepartmentComponent, GoalsComponent, HistoryComponent,
    PersonalComponent, RolesComponent, RoutingComponent, ShortcutsComponent,
    TriggersComponent, VisitorsComponent, WidgetComponent, MonitorComponent,
    AgentTestComponent
} from './admin/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UsersComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    // admin section
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'agents', component: AgentComponent, canActivate: [AuthGuard] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
    { path: 'banned', component: BannedComponent, canActivate: [AuthGuard] },
    { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
    { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
    { path: 'qa', component: QuesAnswerComponent, canActivate: [AuthGuard] },
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'routing', component: RoutingComponent, canActivate: [AuthGuard] },
    { path: 'shortcuts', component: ShortcutsComponent, canActivate: [AuthGuard] },
    { path: 'triggers', component: TriggersComponent, canActivate: [AuthGuard] },
    { path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
    { path: 'widget', component: WidgetComponent, canActivate: [AuthGuard] },
    { path: 'monitoring', component: MonitorComponent, canActivate: [AuthGuard] },
    { path: 'agenttest', component: AgentTestComponent, canActivate: [AuthGuard] },

    

    //{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
   // { path: 'User', loadChildren: './user/user.module#UserModule' }
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }


];

export const routing = RouterModule.forRoot(appRoutes, {
    useHash: true
});

