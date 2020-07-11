"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const irc = require("irc");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const process = require("process");
const client = new irc.Client('irc.freenode.net', 'trayan_bot', {
    channels: ['#course-node']
});
client.on('error', (err) => {
    console.error(err);
});
client.on('message', (from, to, message) => {
    console.log(`Message received: ${from} -> ${to} : ${message}`);
});
const data = rxjs_1.from(['', '', '', 'Hello', 'Reactive', 'Extensions', 'JavaScript', 'from', 'TypeScript']);
const int = rxjs_1.interval(3000);
const result = rxjs_1.zip(data, int).pipe(operators_1.filter(([text, num]) => text.length > 0), operators_1.map(([text, num]) => `${num}: ${text} [${new Date().getTime()}]`));
client.on('connect', () => {
    result.subscribe(next => client.say('#course-node', next), err => console.error(err), () => {
        // client.part('#course-node');
        console.log('All messages sent successfully.');
    });
});
const finish = () => {
    client.part('#course-node', 'Bye from trayans bot!', undefined);
    console.log('Demo finished');
    process.exit(0);
};
setTimeout(finish, 120000);
//# sourceMappingURL=04_irc_client.js.map