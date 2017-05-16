import {ErrorHandler, forwardRef, Inject} from '@angular/core';
import { AppState } from '../app.service';
import { MessageHandler } from "./message-handler.service";


/**
 * Class used to catch and mask technical errors in the frontend to prevent the application from stopping responding
 * must be provided to the desired module with
 *     providers: [
 *       ...,
 *       {provide: ErrorHandler, useClass: CustomErrorHandler}
 *     ]
 */
export class CustomErrorHandler extends MessageHandler implements ErrorHandler {

    // forwardRef is used to inject services that have yet to be initialized
    constructor(@Inject(forwardRef(() => AppState)) appState:AppState){
        super(appState);
    }
}
