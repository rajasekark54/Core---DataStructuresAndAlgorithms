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

class InfixToPreFix extends Stack {
  constructor() {
    super();
    this.postfix = [];
  }

  isOperator(elm) {
    return Object.values(SYMBOLS).includes(elm);
  }

  precedence(elm) {
    if (
      SYMBOLS.AT === elm ||
      SYMBOLS.OPEN_BRACKET === elm ||
      SYMBOLS.CLOSE_BRACKET === elm
    ) {
      return 1;
    } else if (SYMBOLS.PLUS === elm || SYMBOLS.MINUS === elm) {
      return 2;
    } else if (SYMBOLS.MULTIPLE === elm || SYMBOLS.DIVID === elm) {
      return 3;
    } else if (SYMBOLS.POWER === elm) {
      return 4;
    }

    return 0;
  }

  conversion(str) {
    let infix = str.trim().split('');
    let infixReverseList = infix.reverse();

    for (const elm of infixReverseList) {
      if (this.isOperator(elm)) {
        if (elm === SYMBOLS.CLOSE_BRACKET) {
          this.push(elm);
        } else if (elm === SYMBOLS.OPEN_BRACKET) {
          while (this.top > -1 && this.peek() !== SYMBOLS.CLOSE_BRACKET) {
            this.postfix.push(this.pop());
          }
          this.pop();
        } else {
          if (this.precedence(elm) > this.precedence(this.peek())) {
            this.push(elm);
          } else {
            while (
              this.top > -1 &&
              this.precedence(elm) < this.precedence(this.peek())
            ) {
              this.postfix.push(this.pop());
            }

            this.push(elm);
          }
        }
      } else {
        this.postfix.push(elm);
      }
    }

    while (this.top > -1) {
      this.postfix.push(this.pop());
    }

    let revertRevers = this.postfix.reverse();
    return revertRevers.join('');
  }
}

class PrefixToInfix extends Stack {
  constructor() {
    super();
  }

  isOperator(elm) {
    return Object.values(SYMBOLS).includes(elm);
  }

  conversion(str) {
    for (let i = str.length - 1; i >= 0; i--) {
      const elm = str[i];

      if (!this.isOperator(elm)) {
        this.push(elm);
      } else {
        let opn1 = this.pop();
        let opn2 = this.pop();

        this.push('(' + opn1 + elm + opn2 + ')');
      }
    }

    return this.pop();
  }
}

describe('InfixToPostFix', () => {
  let infToPos;

  beforeEach(() => {
    infToPos = new InfixToPreFix();
  });

  test('1', () => {
    let res1 = infToPos.conversion('A+B*C+D');
    expect(res1).toEqual('++A*BCD');
  });

  test('2', () => {
    let res2 = infToPos.conversion('((a+b)*c)');
    expect(res2).toEqual('*+abc');
  });

  test('3', () => {
    let res3 = infToPos.conversion('a+b');
    expect(res3).toEqual('+ab');
  });

  test('4', () => {
    let res4 = infToPos.conversion('K+L-M*N+(O^P)*W/U/V*T+Q');
    expect(res4).toEqual('++-+KL*MN*//*^OPWUVTQ');
  });
});

describe('InfixToPostFix', () => {
  let prefixToInfx;

  beforeEach(() => {
    prefixToInfx = new PrefixToInfix();
  });

  test('1', () => {
    let res1 = prefixToInfx.conversion('++A*BCD');
    expect(res1).toEqual('((A+(B*C))+D)');
  });

  test('3', () => {
    let res3 = prefixToInfx.conversion('+ab');
    expect(res3).toEqual('(a+b)');
  });
});
