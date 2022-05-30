import { spawn, ChildProcess } from 'child_process';
import axios, { AxiosInstance } from 'axios';
import waitOn from 'wait-on';

jest.setTimeout(15000);

describe('serverless framework example', () => {
  let start: ChildProcess;
  let client: AxiosInstance;

  beforeAll(async () => {
    client = axios.create({ baseURL: 'http://localhost:3000', validateStatus: () => true });
    start = spawn('npm.cmd', ['start'], { cwd: __dirname, detached: true });
    await waitOn({ resources: ['tcp:localhost:3000'] });
  });

  afterAll(() => process.kill(start.pid));

  test('GET /dev/users returns 200 with array of all users', async () => {
    const res = await client.get('/dev/users');
    expect(res.status).toBe(200);
    // expect(res.data).toEqual({ operationId: 'getPets' });
  });


});