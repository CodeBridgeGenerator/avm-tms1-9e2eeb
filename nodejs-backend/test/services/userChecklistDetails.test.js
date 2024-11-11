const assert = require('assert');
const app = require('../../src/app');

describe('\'userChecklistDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('userChecklistDetails');

    assert.ok(service, 'Registered the service (userChecklistDetails)');
  });
});
