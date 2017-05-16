import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Constants } from './constants';
import { AppState } from '../app.service';
import { MessageHandler } from './message-handler.service';

@Injectable()
export class HttpRequester {
    private _result: any;
    private _headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

    constructor(private _http: Http, private appState:AppState,private messageHandler: MessageHandler) { }

    setHeaders(newHeadersData:any){
        this._headers = new Headers(newHeadersData);
    }

    get(url: string, doSuccess:Function, doFail:Function, data?:any) {
        let defaultHeaders=new Headers({'Accept': 'application/json'});
        let getParams = new URLSearchParams();
        if (data) {
            let params = JSON.parse(JSON.stringify(data));
            for (var key in params) {
                getParams.set(key, params[key]);
            }
        }
        let obs = this._http.get(url, { search: getParams,headers: defaultHeaders })
            .map(res => res.json())
            .share(); // .share() transforms the "cold" observable (which is resolved for every subscription) into a "hot" observable (which is resolved once)
        let sub = obs.subscribe(
            data => {
                if(doSuccess != null) doSuccess(this.verifyAlert(data));
            },
            err => {
                this.handleError(err);
                if(doFail != null) doFail(err);
            },
        );
        // returns the observable so it can be subscribed by the caller and the subscriptiton for cancelling purposes
        return {observable:obs, subscription:sub};
    }

    post(url:string, doSuccess:Function, doFail:Function, data?:any, keepJson?:boolean, header?:Headers) {
        let dataToSend = keepJson ? data : JSON.stringify(data);
        let requestHeader = header ? header : this._headers;
        this._http.post(url, dataToSend, {headers: requestHeader})
            .map(res => {
                try {
                    return res.json();
                } catch (parseException) {
                    return res;
                }})
            .subscribe(
                data => {
                    if (doSuccess != null) doSuccess(this.verifyAlert(data));
                },
                err => {
                    this.handleError(err);
                    if(doFail != null) doFail(err);
                },
                () => console.log('POST Complete')
            );
    }

    put(url:string, doSuccess:Function, doFail:Function, data?:any, keepJson?:boolean, header?:Headers) {
        let dataToSend = keepJson ? data : JSON.stringify(data);
        let requestHeader = header ? header : this._headers;
        let result:any;
        this._http.put(url, dataToSend, {headers: requestHeader})
            .map(res => res.json())
            .subscribe(
                data => {
                    if(doSuccess != null) doSuccess(this.verifyAlert(data));
                },
                err => {
                    this.handleError(err);
                    if(doFail != null) doFail(err);
                },
                () => console.log('PUT Complete')
            );
    }

    delete(url:string, doSuccess, doFail, header?:Headers) {
        let requestHeader = header ? header : new Headers({'Access-Control-Allow-Methods': 'DELETE'});
        this._http.delete(url, requestHeader)
        .map(res => res.json())
        .subscribe(
            data => {
                if(doSuccess != null) doSuccess(this.verifyAlert(data));
            },
            err => {
                this.handleError(err);
                if(doFail != null) doFail(err);
            },
        );
    }

    private handleError(err) {
        console.debug("Error in request : ", err);
        if (err.status == 401){ // authentication error -> resetting the application
            this.appState.publish(Constants.events.authenticationError);
        } else if (err.status == 403){
            this.messageHandler.handleSpecificError('ERROR_FORBIDDEN', '');
        } else if (err.status == 500){
            this.messageHandler.handleSpecificError('ERROR_SERVER', '');
        }
    }

    private verifyAlert(result){
        if (result.alerts){
            if(result.alerts.length>0){
                this.appState.publish(Constants.events.alertCreate, result);
            }
            delete result.ok;
            delete result.alerts;
            delete result.validationDate;
        }
        return result.data || result;
    }
}
