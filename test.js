'use strict';
var assert = require('assert');
var yosay = require('./index');

describe('yosay', function () {
  it('should return correctly formatted string', function () {
    var expected = '\n     _-----_\n    |       |    .--------------------------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m            \u001b[0mHi\u001b[0m            \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m\'--------------------------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
    assert.equal(yosay('Hi'), expected);
  });

  it('should allow customization of line length', function () {
    var expected = '\n     _-----_\n    |       |    .----------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m    \u001b[0mHi\u001b[0m    \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m\'----------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
    assert.equal(yosay('Hi', { maxLength: 8 }), expected);
  });

  it('should override a maxLength setting that is too short', function () {
    var expected = '\n     _-----_\n    |       |    .--------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m \u001b[0mHello,\u001b[0m \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m|\u001b[0m \u001b[0mbuddy!\u001b[0m \u001b[0m|\u001b[0m\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \u001b[0m\'--------\'\n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
    assert.equal(yosay('Hello, buddy!', { maxLength: 4 }), expected);
  });

  describe('ansi', function () {
    var chalk = require('chalk');

    it('should display ansi styling correctly', function () {
      var expected = '\n     _-----_\n    |       |    .--------------------------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m            \u001b[0m\u001b[47m\u001b[31mH\u001b[47m\u001b[31mi\u001b[0m            \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m\'--------------------------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
      assert.equal(yosay(chalk.red.bgWhite('Hi')), expected);
    });

    it('should handle part ansi and part not-ansi', function () {
      var expected = '\n     _-----_\n    |       |    .--------------------------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m      \u001b[0m\u001b[47m\u001b[31mH\u001b[47m\u001b[31mi\u001b[39m\u001b[49m \u001b[39m\u001b[49mt\u001b[39m\u001b[49mh\u001b[39m\u001b[49me\u001b[39m\u001b[49mr\u001b[39m\u001b[49me\u001b[39m\u001b[49m,\u001b[39m\u001b[49m \u001b[39m\u001b[49ms\u001b[39m\u001b[49mi\u001b[39m\u001b[49mr\u001b[39m\u001b[49m!\u001b[0m      \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m\'--------------------------\'\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
      assert.equal(yosay(chalk.red.bgWhite('Hi') + ' there, sir!'), expected);
    });

    it('should wrap ansi styling to the next line properly', function () {
      var expected = '\n     _-----_\n    |       |    .--------------------------.\n    |\u001b[31m--(o)--\u001b[39m|    \u001b[0m|\u001b[0m  \u001b[0m\u001b[47m\u001b[31mH\u001b[47m\u001b[31mi\u001b[39m\u001b[49m \u001b[39m\u001b[49mt\u001b[39m\u001b[49mh\u001b[39m\u001b[49me\u001b[39m\u001b[49mr\u001b[39m\u001b[49me\u001b[39m\u001b[49m,\u001b[39m\u001b[49m \u001b[39m\u001b[49ms\u001b[39m\u001b[49mi\u001b[39m\u001b[49mr\u001b[39m\u001b[49m!\u001b[39m\u001b[49m \u001b[37m\u001b[44my\u001b[37m\u001b[44mo\u001b[37m\u001b[44mu\u001b[37m\u001b[44m \u001b[37m\u001b[44ma\u001b[37m\u001b[44mr\u001b[37m\u001b[44me\u001b[0m  \u001b[0m|\u001b[0m\n   `---------´   \u001b[0m|\u001b[0m   \u001b[0m\u001b[37m\u001b[44ml\u001b[37m\u001b[44mo\u001b[37m\u001b[44mo\u001b[37m\u001b[44mk\u001b[37m\u001b[44mi\u001b[37m\u001b[44mn\u001b[37m\u001b[44mg\u001b[49m\u001b[39m \u001b[49m\u001b[39ms\u001b[49m\u001b[39mw\u001b[49m\u001b[39me\u001b[49m\u001b[39ml\u001b[49m\u001b[39ml\u001b[49m\u001b[39m \u001b[49m\u001b[39mt\u001b[49m\u001b[39mo\u001b[49m\u001b[39md\u001b[49m\u001b[39ma\u001b[49m\u001b[39my\u001b[49m\u001b[39m!\u001b[0m   \u001b[0m|\u001b[0m\n    \u001b[33m(\u001b[39m _\u001b[33m´U`\u001b[39m_ \u001b[33m)\u001b[39m    \u001b[0m\'--------------------------\'\n    /___A___\\    \n     \u001b[33m|  ~  |\u001b[39m     \n   __\u001b[33m\'.___.\'\u001b[39m__   \n ´   \u001b[31m`  |\u001b[39m° \u001b[31m´ Y\u001b[39m ` \n';
      assert.equal(yosay(chalk.red.bgWhite('Hi') + ' there, sir! ' + chalk.bgBlue.white('you are looking') + ' swell today!'), expected);
    });
  });
})
