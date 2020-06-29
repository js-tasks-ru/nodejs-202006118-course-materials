const sinon = require('sinon');
const {expect} = require("chai");

const retry = require('./004-retry');

describe('retry', () => {

  // after
  // before

  // beforeEach
  afterEach(() => {
    sinon.restore();
  });

  it('should call passed function and return it\'s result if any', async () => {
    const result = 'result';
    const self = {};
    const fn = sinon.stub().resolves(result);
    const args = [1, 2, 3]

    const actual = await retry(1000, fn, self, ...args);

    expect(actual).to.be.eq(result);
    expect(fn).to.have.been.calledOnce;
    expect(fn).to.have.been.calledOn(self);
    expect(fn).to.have.been.calledWithExactly(...args)

  });

  it('should call passed function second time if error has been returned after the first call', async () => {
    const result = 'result';
    const fn = sinon.stub().onFirstCall().rejects().onSecondCall().resolves(result);

    const actual = await retry(0, fn, {});

    expect(actual).to.be.eq(result);
    expect(fn).to.have.been.calledTwice;
  });

  it('should call the function second time after specified amount of time', async () => {

    const result = 'result';
    const clock = sinon.useFakeTimers();
    const fn = sinon.stub()
      .onFirstCall().throws(new Error())
      .onSecondCall().resolves(result);

    const timeout = 1000;

    const actualPromise = retry(timeout, fn);

    await Promise.resolve();

    clock.tick(timeout);

    const actual = await actualPromise;

    expect(fn).to.have.been.calledTwice;
    expect(actual).to.be.equal(result);
  });
});
