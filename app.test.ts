import { spawn, ChildProcess } from 'child_process';
import axios, { AxiosInstance } from 'axios';
import waitOn from 'wait-on';
import { nanoid } from 'nanoid';

jest.setTimeout(15000);

describe('serverless framework example', () => {
  let start: ChildProcess;
  let client: AxiosInstance;

  let userIds: any = [];
  let phoneNumbers: any = [];

  const numberOfUsers = 5;

  let beforeUserCreated: any;

  beforeAll(async () => {
    client = axios.create({ baseURL: 'http://localhost:3000', validateStatus: () => true });
    start = spawn('npm.cmd', ['run', "dev"], { cwd: __dirname, detached: true });
    console.log(start)
    await waitOn({ resources: ['tcp:localhost:3000'] });
  });

  // afterAll(() => process.kill(start.pid));

  test('GET /dev/users returns 200 with array of all users', async () => {
    beforeUserCreated = await client.get('/dev/users');
    
    const promises = [...Array(numberOfUsers)].map(async () => {
      const phoneNumber = nanoid(11);
      const user = await client.post('/dev/users', {phoneNumber});
      userIds.push(user.data.user.id);
      phoneNumbers.push(user.data.user.phone_no);
    })
    await Promise.all(promises);

    const afterUserCreated = await client.get('/dev/users');

    const expected = afterUserCreated.data.length - beforeUserCreated.data.length - userIds.length;

    expect(expected).toBe(0);
    expect(userIds.length).toBe(numberOfUsers);

  });

  test('PATCH /dev/users returns 400 as to update data without phone', async () => {
    const res = await client.patch(`/dev/users?id=${userIds.join(",")}`);
    expect(res.status).toBe(400);
  });

  test('PATCH /dev/users returns 200 as no query params was given', async () => {
    const res = await client.patch(`/dev/users?id=${userIds.join(",")}&phoneNumber=${phoneNumbers.join(",")}`);
    expect(res.status).toBe(200);
    expect(res.data.updated.length).toBe(numberOfUsers);
  });

  test('DELETE dev/users returns 200 after delete that user', async () => {
    const res = await client.delete(`/dev/users?id=${userIds.join(",")}`);
    const {deleted} = res.data;
    let deleted_len = 0;
    deleted.map(user => {
      if(phoneNumbers.includes(user.phone_no)) deleted_len++;
    })
    expect(res.status).toBe(200);
    expect(deleted_len).toBe(numberOfUsers);
  });

  test('GET /dev/users returns 200 with array of all users now test, the data is consistent or not', async () => {
    const res = await client.get('/dev/users');
    expect(res.data.length).toBe(beforeUserCreated.data.length);
  });

  test('PATCH /dev/users returns 400 as no query params was given', async () => {
    const res = await client.patch('/dev/users');
    expect(res.status).toBe(400);
  });

});