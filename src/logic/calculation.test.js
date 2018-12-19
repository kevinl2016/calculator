import calculation from './calculation';
import chai from 'chai';

chai.config.truncateThreshold = 0;

const expect = chai.expect;

function pressButtons(buttons) {
  const value = {};
  buttons.forEach(button => {
    Object.assign(value, calculation(value, button));
  });

  Object.keys(value).forEach(key => {
    if (value[key] === null) {
      delete value[key];
    }
  });
  return value;
}

function expectButtons(buttons, expectation) {
  expect(pressButtons(buttons)).to.deep.equal(expectation);
}

function test(buttons, expectation, only = false) {
  const func = only ? it.only : it;
  func(`buttons ${buttons.join(',')} -> ${JSON.stringify(expectation)}`, () => {
    expectButtons(buttons, expectation);
  });
}

describe('calculation', function() {
  test(['8'], { nextVal: '8' });

  test(['6', '7'], { nextVal: '67' });

  test(['6', '+', '7'], {
    nextVal: '7',
    total: '6',
    operation: '+',
  });

  test(['6', '+', '8', '='], {
    total: '14',
  });

  test(['0', '0', '+', '0', '='], {
    total: '0',
  });

  test(['6', '+', '6', '=', '9'], {
    nextVal: '9',
  });

  test(['3', '+', '6', '=', '+'], {
    total: '9',
    operation: '+',
  });

  test(['3', '+', '6', '=', '+', '9'], {
    total: '9',
    operation: '+',
    nextVal: '9',
  });

  test(['3', '+', '6', '=', '+', '9', '='], {
    total: '18',
  });

  test(['3', '+', '=', '3', '='], {
    total: '6',
  });

  test(['+'], {
    operation: '+',
  });

  test(['+', '4'], {
    nextVal: '4',
    operation: '+',
  });

  test(['+', '3', '+'], {
    total: '3',
    operation: '+',
  });

  test(['+', '3', '+', '+'], {
    total: '3',
    operation: '+',
  });

  test(['+', '3', '+', '5'], {
    nextVal: '5',
    total: '3',
    operation: '+',
  });

  test(['+', '2', '4'], {
    nextVal: '24',
    operation: '+',
  });

  test(['+', '2', '5'], {
    nextVal: '25',
    operation: '+',
  });

  test(['+', '6', '+', '7', '='], {
    total: '13',
  });

  test(['0', '.', '6'], {
    nextVal: '0.6',
  });

  test(['.', '7'], {
    nextVal: '0.7',
  });

  test(['.', '4', '-', '.', '2'], {
    total: '0.4',
    nextVal: '0.2',
    operation: '-',
  });

  test(['.', '4', '-', '.', '2', '='], {
    total: '0.2',
  });


  test(['2', '^', '2'], {
    nextVal: '2',
    total: '2',
    operation: '^',
  });

  test(['2', '^', '3', '='], {
    total: '8',
  });
  test(['1', '+', '2', 'AC'], {});
  test(['+', '2', 'AC'], {});

  test(['4', 'Sqrt'], {
    nextVal: '2',
  });

  test(['4', 'Sqrt', 'x', '2', '='], {
    total: '4',
  });

  test(['4', 'Sqrt', 'x', '2'], {
    total: '2',
    operation: 'x',
    nextVal: '2',
  });

});