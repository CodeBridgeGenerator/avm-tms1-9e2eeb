const assert = require('assert');
const app = require('../../src/app');

describe('\'timerDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('timerDetails');

    assert.ok(service, 'Registered the service (timerDetails)');
  });
});
