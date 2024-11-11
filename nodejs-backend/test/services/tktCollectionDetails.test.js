const assert = require('assert');
const app = require('../../src/app');

describe('\'tktCollectionDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('tktCollectionDetails');

    assert.ok(service, 'Registered the service (tktCollectionDetails)');
  });
});
