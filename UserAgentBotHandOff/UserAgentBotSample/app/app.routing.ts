import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UsersComponent } from './user/index';
import { ForgotPasswordComponent } from './forgotpassword/index';
import { AuthGuard } from './_guards/auth.guard';

import { AdminComponent } from './admin/index';
import { AccountComponent } from './admin/index';
import { AgentComponent } from './admin/index';
import { AnalyticsComponent } from './admin/index';
import { BannedComponent } from './admin/index';
import { DepartmentComponent } from './admin/index';
import { GoalsComponent } from './admin/index';
import { HistoryComponent } from './admin/index';

import { PersonalComponent } from './admin/index';
import { QuesAnswerComponent } from './admin/quesanswer/index';

import { RolesComponent } from './admin/index';
import { RoutingComponent } from './admin/index';
import { ShortcutsComponent } from './admin/index';
import { TriggersComponent } from './admin/index';
import { VisitorsComponent } from './admin/index';
import { WidgetComponent } from './admin/index';
import { MonitorComponent } from './admin/index';
import { AgentTestComponent } from './admin/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UsersComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    // admin section
    //{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    //{ path: 'agents', component: AgentComponent, canActivate: [AuthGuard] },
    //{ path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
    //{ path: 'banned', component: BannedComponent, canActivate: [AuthGuard] },
    //{ path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
    //{ path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    //{ path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    //{ path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
    //{ path: 'qa', component: QuesAnswerComponent, canActivate: [AuthGuard] },
    //{ path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    //{ path: 'routing', component: RoutingComponent, canActivate: [AuthGuard] },
    //{ path: 'shortcuts', component: ShortcutsComponent, canActivate: [AuthGuard] },
    //{ path: 'triggers', component: TriggersComponent, canActivate: [AuthGuard] },
    //{ path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
    //{ path: 'widget', component: WidgetComponent, canActivate: [AuthGuard] },

    { path: 'account', component: AccountComponent},
    { path: 'agents', component: AgentComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'banned', component: BannedComponent },
    { path: 'departments', component: DepartmentComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'history', component: HistoryComponent},
    { path: 'personal', component: PersonalComponent },
    { path: 'qa', component: QuesAnswerComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'routing', component: RoutingComponent },
    { path: 'shortcuts', component: ShortcutsComponent },
    { path: 'triggers', component: TriggersComponent },
    { path: 'visitors', component: VisitorsComponent},
    { path: 'widget', component: WidgetComponent },
    { path: 'monitoring', component: MonitorComponent },
    { path: 'agenttest', component: AgentTestComponent },


    //{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
   // { path: 'User', loadChildren: './user/user.module#UserModule' }
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }


];

export const routing = RouterModule.forRoot(appRoutes, {
    useHash: true
});

