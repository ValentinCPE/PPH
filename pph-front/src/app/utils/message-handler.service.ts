import { Injectable } from "@angular/core";
import { AppState } from '../app.service';
import { Constants } from './constants';

//import * as moment from 'moment/moment';

/**
 * Class used to show toasts to the user
 */
@Injectable()
export class MessageHandler {

    // forwardRef is used to inject services that have yet to be initialized
    constructor(private appState:AppState){}

    handleInfo(messageKey: String, message: String) {
        let alert = {
            type:"INFO",
            date:  new Date(),
            messageKey: messageKey,
            message : message || "",
        };
        if (this.appState && this.appState.publish) this.appState.publish(Constants.events.alertCreate, {alerts:[alert]});
    }

    handleSpecificError(messageKey: String, message: String) {
        let alert = {
            type:"ERROR",
            date:  new Date(),
            messageKey: messageKey,
            message : message || ""
        };
        if (this.appState && this.appState.publish) this.appState.publish(Constants.events.alertCreate, {alerts:[alert]});
    }

    handleError(error) {
        let alert = {
            type:"ERROR",
            date:  new Date(),
            messageKey: "ERROR_UNKNOW_ERROR",
            message : ""
        };
        if (this.appState && this.appState.publish) this.appState.publish(Constants.events.alertCreate, {alerts:[alert]});
    }
}
