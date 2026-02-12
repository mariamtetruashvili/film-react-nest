import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should format log message in TSKV', () => {
    // spy on stdout
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation();

    logger.log('Hello world');

    expect(spy).toHaveBeenCalled();
    const logged = spy.mock.calls[0][0];
    expect(logged).toContain('level=log');
    expect(logged).toContain('message=Hello world');

    spy.mockRestore();
  });

  it('should format error message in TSKV', () => {
    const spy = jest.spyOn(process.stderr, 'write').mockImplementation();

    logger.error('Something went wrong', 'stacktrace');

    expect(spy).toHaveBeenCalled();
    const logged = spy.mock.calls[0][0];
    expect(logged).toContain('level=error');
    expect(logged).toContain('message=Something went wrong');
    expect(logged).toContain('trace=stacktrace');

    spy.mockRestore();
  });
});
