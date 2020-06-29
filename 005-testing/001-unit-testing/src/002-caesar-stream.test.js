const {expect} = require('chai');
const {Readable, Writable} = require('stream');

const {CaesarCipherEncode} = require('./002-caesar-stream');

const toString = (cb) => {
  let string = '';
  return new Writable({
    write(chunk, encoding, callback) {
      string += chunk.toString();
      return callback();
    },
    final(callback) {
      process.nextTick(() => {
        cb(string)
      })
    }
  })
};

describe('CaesarCipherEncode', () => {

  it('should create a instance of CaesarCipherEncode', () => {
    expect(new CaesarCipherEncode()).to.be.instanceOf(CaesarCipherEncode);
  });

  it('should encode stream', (done) => {
    // arrange
    const shift = 1;
    const encoder = new CaesarCipherEncode(shift);

    const expected = 'bcd';

    const source = Readable.from(['abc']);

    // act
    source.pipe(encoder).pipe(toString((actual) => {

      // assert
      expect(actual).to.be.equal(expected);
      done();

    }));


  });
});
