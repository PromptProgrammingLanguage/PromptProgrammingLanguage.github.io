// I fed ChatGPT4 the syntax file for vim, and it generated this mostly verbatim...
// jesus christ

hljs.registerLanguage('prompt', function (hljs) {
  const BASH_SUBMODE = {
    begin: '`',
    end: '`',
    subLanguage: 'bash',
  };

  const YAML_SUBMODE = {
    begin: '^\\s+(direction|description|history|eager)(?=\\s*:)',
    end: '^\\s*(?=\\{)',
    subLanguage: 'yaml',
  };

  return {
    name: 'Prompt',
    contains: [
      {
        className: 'name',
        begin: '^[A-Za-z0-9_]+$',
        next: 'yaml_code',
      },
      {
        className: 'match',
        beginKeywords: 'match',
        end: '\\$[A-Z]+',
        contains: [
          {
            className: 'variable',
            begin: '\\$[A-Z]+',
          },
          {
            className: 'regex',
            begin: '\\(([^)]*)\\)',
          },
          {
            className: 'arrow',
            begin: '=>',
          },
          BASH_SUBMODE,
        ],
      },
      {
        className: 'arrow',
        begin: '->',
      },
      {
        className: 'callgroup',
        begin: '\([A-Za-z0-9_]+,?\)+',
      },
      {
        className: 'variable',
        begin: '\\$[A-Z]+',
      },
      hljs.COMMENT('#', '$'),
      BASH_SUBMODE,
      YAML_SUBMODE,
    ],
  };
});

[ ...document.querySelectorAll('[id^=example]') ].forEach(el => {
  console.log(el);
  const result = hljs.highlight(el.textContent, { language: 'prompt' });
  el.innerHTML = result.value;
});
