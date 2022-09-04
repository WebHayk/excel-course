export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatcher
    emit(event, ...args) {
        this.listeners[event].forEach(listener => {
           listener(...args);
        });
    }

    // subscriber || add new events
    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
        }
    }
}