//Infix to Postfix conversion
//Postfix to Infix conversion

const SYMBOLS = {
  AT: '@',
  OPEN_BRACKET: '(',
  CLOSE_BRACKET: ')',
  PLUS: '+',
  MINUS: '-',
  MULTIPLE: '*',
  DIVID: '/',
  POWER: '^',
};

class Stack {
  constructor() {
    this.list = [];
    this.top = -1;
  }

  push(val) {
    this.list[++this.top] = val;
  }

  pop() {
    if (this.top > -1) {
      return this.list[this.top--];
    }
    return 'Underflow';
  }

  peek() {
    if (this.top > -1) {
      return this.list[this.top];
    }

    return 'Empty List';
  }
}

class InfixToPostFix extends Stack {
  constructor() {
    super();
    this.postfix = [];
  }

  isOperator(elm) {
    return Object.values(SYMBOLS).includes(elm);
  }

  precedence(elm) {
    switch (elm) {
      case SYMBOLS.AT:
      case SYMBOLS.OPEN_BRACKET:
      case SYMBOLS.CLOSE_BRACKET:
        return 1;
      case SYMBOLS.PLUS:
      case SYMBOLS.MINUS:
        return 2;
      case SYMBOLS.MULTIPLE:
      case SYMBOLS.DIVID:
        return 3;
      case SYMBOLS.POWER:
        return 4;
      default:
        return 0;
    }
  }

  conversion(str) {
    let infix = str.trim().split('');

    for (const elm of infix) {
      if (this.isOperator(elm)) {
        if (elm === SYMBOLS.OPEN_BRACKET) {
          this.push(elm);
        } else if (elm === SYMBOLS.CLOSE_BRACKET) {
          while (this.top > -1 && this.peek() !== SYMBOLS.OPEN_BRACKET) {
            this.postfix.push(this.pop());
          }
          this.pop();
        } else if (this.precedence(elm) > this.precedence(this.peek())) {
          this.push(elm);
        } else {
          while (
            this.top > -1 &&
            this.precedence(elm) <= this.precedence(this.peek())
          ) {
            this.postfix.push(this.pop());
          }

          this.push(elm);
        }
      } else {
        this.postfix.push(elm);
      }
    }

    while (this.top > -1) {
      this.postfix.push(this.pop());
    }

    return this.postfix.join('');
  }
}

class PostFixTOInfix extends Stack {
  constructor() {
    super();
  }

  isOperator(elm) {
    return Object.values(SYMBOLS).includes(elm);
  }

  conversion(str) {
    for (const elm of str.split('')) {
      if (!this.isOperator(elm)) {
        this.push(elm);
      } else {
        let operand2 = this.pop();
        let operand1 = this.pop();

        this.push('(' + operand1 + elm + operand2 + ')');
      }
    }

    return this.pop();
  }
}

describe('InfixToPostFix', () => {
  let infToPos;

  beforeEach(() => {
    infToPos = new InfixToPostFix();
  });

  test('1', () => {
    let res1 = infToPos.conversion('A+B*C+D');
    expect(res1).toEqual('ABC*+D+');
  });

  test('2', () => {
    let res2 = infToPos.conversion('((a+b)*c)');
    expect(res2).toEqual('ab+c*');
  });

  test('3', () => {
    let res3 = infToPos.conversion('a+b');
    expect(res3).toEqual('ab+');
  });

  test('4', () => {
    let res4 = infToPos.conversion('K+L-M*N+(O^P)*W/U/V*T+Q');
    expect(res4).toEqual('KL+MN*-OP^W*U/V/T*+Q+');
  });
});

describe('PostFixTOInfix', () => {
  let posToInfx;

  beforeEach(() => {
    posToInfx = new PostFixTOInfix();
  });

  test('1', () => {
    let res1 = posToInfx.conversion('ABC*+D+');
    expect(res1).toEqual('((A+(B*C))+D)');
  });

  test('2', () => {
    let res2 = posToInfx.conversion('ab+c*');
    expect(res2).toEqual('((a+b)*c)');
  });

  test('3', () => {
    let res3 = posToInfx.conversion('ab+');
    expect(res3).toEqual('(a+b)');
  });
});
