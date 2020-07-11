"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("Hello TypeScript NodeJS!!!");
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map