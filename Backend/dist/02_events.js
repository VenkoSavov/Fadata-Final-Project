"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const emitter = new events_1.EventEmitter();
emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)}, ${JSON.stringify(status)}`);
});
emitter.emit('myevent');
emitter.emit('myevent', { name: 'Trayan', age: 35 });
emitter.emit('myevent', { name: 'Trayan', age: 35 }, { status: 'ready' });
let num = 0;
const interval = setInterval(() => emitter.emit('myevent', { num: (++num), name: 'Trayan', age: 35 }, 'active'), 3000);
setTimeout(clearInterval, 10000, interval);
//# sourceMappingURL=02_events.js.map