import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from './utils/';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  _eventEmitters: InternalStateType = {};
  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state[prop];
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  // bind a callback to an eventEmitter for the given event name
  // creates the emitter if it doesn't exist yet
  // returns the subscription so the caller can call "unsubscribe()" on it to stop listening to the event
  subscribe(eventName: string, callback: Function) {
    if (this._eventEmitters[eventName] == undefined) this._eventEmitters[eventName] = new EventEmitter();
    return this._eventEmitters[eventName].subscribe(callback);
  }

  // emits an event on a given eventEmitter identified but the event name
  // creates the emitter if it doesn't exist yet
  publish(eventName: string, value?: any) {
    if (this._eventEmitters[eventName] == undefined) this._eventEmitters[eventName] = new EventEmitter();
    this._eventEmitters[eventName].emit(value);
  }

  // clones an object recursively avoiding circular references
  _clone(oldObj) {
    // simple object clone
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        if (i != 'parent') { // this is needed because some object have circular references
          newObj[i] = this._clone(oldObj[i]);
        }
      }
    }
    return newObj;
  }

}

