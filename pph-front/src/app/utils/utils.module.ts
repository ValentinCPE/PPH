import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Ng2CompleterModule } from "ng2-completer";
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from '../app-routing/app-routing.module';

import { CustomDatePicker } from './custom-datepicker';
import { Pagination } from './pagination';
import { MomentDatePipe } from './pipes/momentDatePipe';
import { HttpRequester } from './http-request.service';
import { Constants } from "./constants";
import { MessageHandler } from "./message-handler.service";


@NgModule({
    declarations: [
        CustomDatePicker,
        MomentDatePipe,
        Pagination
    ],
    imports: [ // import Angular's modules
        CommonModule,
        FormsModule,
        HttpModule,
        Ng2CompleterModule,
        CKEditorModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.assetsUrl, '.json'),
            deps: [Http]
        })
    ],
    providers: [HttpRequester,
        MessageHandler],
    exports:[
        CommonModule,
        FormsModule,
        HttpModule,
        TranslateModule,
        CustomDatePicker,
        MomentDatePipe,
        Ng2CompleterModule,
        CKEditorModule,
        AppRoutingModule,
        Pagination
    ]
})

export class UtilsModule {}
