import { NgModule, ErrorHandler }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';


import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ChartsModule } from 'ng2-charts';
//import { Chat } from 'botframework-webchat';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AdminHeaderComponent } from './_directives/index';
import { AdminFooterComponent } from './_directives/index';
import { ChartWindowComponent } from './_directives/index';

import { LogoutComponent } from './_directives/index';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService, AuthenticationService, UserService, UsersService, QuesAnsService, PendingAssistantService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ForgotPasswordComponent } from './forgotpassword/index';
import { AdminComponent } from './admin/index';
import { AccountComponent } from './admin/index';
import { AgentComponent } from './admin/index';
import { AnalyticsComponent } from './admin/index';
import { BannedComponent } from './admin/index';
import { DepartmentComponent } from './admin/index';
import { GoalsComponent } from './admin/index';
import { HistoryComponent } from './admin/index';
import { PersonalComponent } from './admin/index';
import { RolesComponent } from './admin/index';
import { RoutingComponent } from './admin/index';
import { ShortcutsComponent } from './admin/index';
import { TriggersComponent } from './admin/index';
import { VisitorsComponent } from './admin/index';
import { WidgetComponent } from './admin/index';

import { MonitorComponent } from './admin/index';

import { AgentTestComponent } from './admin/index';


import { UsersComponent } from './user/index';

import { UserFilterPipe } from './_filter/index';
import { SearchComponent } from './_shared/search.component';
import AppErrorHandler from './_shared/errorhandler';

import { QuesAnswerComponent } from './admin/quesanswer/index';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        routing,
        Ng2Bs3ModalModule,
        ChartsModule//,
        //Chat
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        UsersComponent,
        UserFilterPipe,
        SearchComponent,
        LogoutComponent,
        QuesAnswerComponent,
        AdminComponent,
        AccountComponent,
        AgentComponent,
        AnalyticsComponent,
        BannedComponent,
        DepartmentComponent,
        GoalsComponent,
        HistoryComponent,
        PersonalComponent,
        RolesComponent,
        RoutingComponent,
        ShortcutsComponent,
        TriggersComponent,
        VisitorsComponent,
        WidgetComponent,
        MonitorComponent,
        ChartWindowComponent,
        AgentTestComponent


    ],
   
    providers: [{ provide: APP_BASE_HREF, useValue: '/' },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        UsersService,
        QuesAnsService,
        PendingAssistantService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }