"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const events_1 = require("events");
const emitter = new events_1.EventEmitter();
emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)}, ${JSON.stringify(status)}`);
});
const data = rxjs_1.from(['Hello', 'Reactive', 'Extensions', 'JavaScript', 'from', 'TypeScript']);
const int = rxjs_1.interval(1000);
const result = rxjs_1.zip(data, int).pipe(operators_1.map(([text, num]) => `${num}: ${text} [${new Date().getTime()}]`));
result.subscribe(next => emitter.emit('myevent', { text: next }));
//# sourceMappingURL=03_events_rxjs.js.map