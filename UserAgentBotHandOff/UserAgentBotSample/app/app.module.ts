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

import {
    AlertComponent, AdminFooterComponent, AdminHeaderComponent,
    ChartWindowComponent, LogoutComponent
} from './_directives/index';

import { AuthGuard } from './_guards/auth.guard';

import {
    AlertService, AuthenticationService, UserService,
    UsersService, QuesAnsService, PendingAssistantService,
    FileService, RoleService, DepartmentService
} from './_services/index';

import { FileUploadComponent } from './_directives/fileupload.component';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ForgotPasswordComponent } from './forgotpassword/index';

import {
    AdminComponent, AccountComponent, AgentComponent, AnalyticsComponent,
    BannedComponent, DepartmentComponent, GoalsComponent, HistoryComponent,
    PersonalComponent, RolesComponent, RoutingComponent, ShortcutsComponent,
    TriggersComponent, VisitorsComponent, WidgetComponent, MonitorComponent,
    AgentTestComponent
} from './admin/index';

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
        AgentTestComponent,

        FileUploadComponent


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
        FileService,
        RoleService,
        DepartmentService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
        
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }