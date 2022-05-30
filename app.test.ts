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

  // afterAll(() => process.kill(start.pid));

  test('GET /dev/users returns 200 with array of all users', async () => {
    const res = await client.get('/dev/users');
    expect(res.status).toBe(200);
  });

  test('POST /dev/users returns 201 creating after creating a user', async () => {
    const res = await client.post('/dev/users', {phoneNumber: "0122222654615222"});
    expect(res.status).toBe(201);
  });

  test('PATCH /dev/users returns 400 as no query params was given', async () => {
    const res = await client.patch('/dev/users');
    expect(res.status).toBe(400);
  });

  test('DELETE dev/users returns 200 after delete that user', async () => {
    const res = await client.delete('/dev/users?phoneNumber=0122222654615222');
    expect(res.status).toBe(200);
  });

  test('DELETE dev/users returns 400 after try to  delete a deleted user', async () => {
    const res = await client.delete('/dev/users?phoneNumber=0122222654615222');
    expect(res.status).toBe(200);
  });

});