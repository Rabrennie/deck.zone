import plugins from '../plugins.json';
import decklangLight from './ace-decklang-light.less';


// generate a list of valid plugin names for the syntax highlighter
const pluginNames = plugins.map(str => {
  const split = str.split('/');
  return split[split.length-1].split('.')[0];
});

// require language tools for snippets to work
require('brace/ext/language_tools.js');

ace.define('ace/snippets/decklang', (require, exports) => {
  exports.snippetText = `
snippet loop
	loop = <\${1:i} = \${2:1}> to \${3:10}
	endloop
snippet loopin
	loop = <\${1:item}> in { \${2} }
	endloop`;

  exports.scope = "decklang"
})

ace.define('ace/mode/decklang', (require, exports) => {

  const oop = require('ace/lib/oop');
  const TextMode = require('ace/mode/text').Mode;
  const DecklangHighlightRules = require('ace/mode/decklang_highlight_rules').DecklangHighlightRules;

  const Mode = function() {
    this.HighlightRules = DecklangHighlightRules;
  };
  oop.inherits(Mode, TextMode);

  (() => {}).call(Mode.prototype);

  exports.Mode = Mode;
});

ace.define('ace/theme/decklang-light', ['require','exports','module','ace/lib/dom'], function(require, exports) {

  exports.isDark = false;
  exports.cssClass = 'ace-decklang-light';
  exports.cssText = decklangLight;

  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});

ace.define('ace/mode/decklang_highlight_rules', (require, exports) => {

  const oop = require('ace/lib/oop');
  const TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;

  const DecklangHighlightRules = function() {

    this.$rules = {

      start: [
        {
          token: 'constant.language',
          regex: /#[\d|A-Fa-f]{3,6}/
        },
        {
          token: 'constant.numeric',
          regex: /\d/
        },
        {
          token: 'storage.type',
          regex: /(\[\w+])/
        },
        {
          token: 'string.quoted.double',
          regex: /"[^\n]+"/
        },
        {
          token: 'variable.other',
          regex: /<[\w\s=\+\/\*-\[\]\(\)]+>/
        },
        {
          token: 'comment.line.number-sign',
          regex: /\s*`.+$/
        },
        {
          token: 'keyword.control',
          regex: /loop|endloop|to|in/
        },
        {
          token: 'support.function',
          regex: new RegExp(`\s*(${pluginNames.join('|')})`),
          caseInsensitive: true
        }
      ]

    };

  };

  oop.inherits(DecklangHighlightRules, TextHighlightRules);

  exports.DecklangHighlightRules = DecklangHighlightRules;
});
