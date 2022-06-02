import api from "./openApi/openApiBackend";
import 'source-map-support/register';
import Express from 'express';
import morgan from 'morgan';

import type { Request } from 'openapi-backend';

const app = Express();
app.use(Express.json());

// api.init();

// // logging
// app.use(morgan('combined'));

// // use as express middleware
// app.use((req, res) => api.handleRequest(req as Request, req, res));

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));