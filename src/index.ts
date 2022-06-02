import api from "./functions/openApi/openApiBackend";
import 'source-map-support/register';
import Express from 'express';
// import "reflect-metadata"
import type { Request } from 'openapi-backend';

const app = Express();
app.use(Express.json());

api.init();
app.use(async (req, res) => {
    const result  = await api.handleRequest(req as Request, req, res);
    console.log(result);
    res.send(result)
});

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));

// exports.default = app;
export default app;