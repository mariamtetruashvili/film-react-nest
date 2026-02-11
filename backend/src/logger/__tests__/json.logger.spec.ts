import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should format log as JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Hello JSON', 'extra');

    expect(spy).toHaveBeenCalled();
    const logged = spy.mock.calls[0][0];
    const parsed = JSON.parse(logged);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('Hello JSON');
    expect(parsed.optionalParams[0]).toBe('extra');

    spy.mockRestore();
  });
});
