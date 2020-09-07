// DOM variables
const btnTrigger = document.querySelector('#btn-trigger');
const modalTitle = document.querySelector('.modal-title');
const answer = document.querySelector('#answer');
const modalBody = document.querySelector('.modal-body');
const modal = document.querySelector('#exampleModal');

// global variables
let correct = '';

// Event triggers
btnTrigger.addEventListener('click', function () {
  getData();
});

answer.addEventListener('click', function () {
  modalBody.innerText = correct;
});

$('#exampleModal').on('hidden.bs.modal', function () {
  modalBody.innerText = '';
});

// functions
function getData() {
  const data = axios
    .get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean')
    .then(({ data }) => {
      for (let questions of data.results) {
        const { data, question, correct_answer } = questions;
        modalTitle.innerText = 'True or False';
        modalBody.innerText = `${htmlspecialchars_decode(
          question,
          'ENT_QUOTES'
        )}`;
        return (correct = correct_answer);
      }
    });
}

// parse strings without special chars
function htmlspecialchars_decode(string, quoteStyle) {
  var optTemp = 0;
  var i = 0;
  var noquotes = false;

  if (typeof quoteStyle === 'undefined') {
    quoteStyle = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    ENT_NOQUOTES: 0,
    ENT_HTML_QUOTE_SINGLE: 1,
    ENT_HTML_QUOTE_DOUBLE: 2,
    ENT_COMPAT: 2,
    ENT_QUOTES: 3,
    ENT_IGNORE: 4,
  };
  if (quoteStyle === 0) {
    noquotes = true;
  }
  if (typeof quoteStyle !== 'number') {
    // Allow for a single string or an array of string flags
    quoteStyle = [].concat(quoteStyle);
    for (i = 0; i < quoteStyle.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quoteStyle[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quoteStyle[i]]) {
        optTemp = optTemp | OPTS[quoteStyle[i]];
      }
    }
    quoteStyle = optTemp;
  }
  if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
    // PHP doesn't currently escape if more than one 0, but it should:
    string = string.replace(/&#0*39;/g, "'");
    // This would also be useful here, but not a part of PHP:
    // string = string.replace(/&apos;|&#x0*27;/g, "'");
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
