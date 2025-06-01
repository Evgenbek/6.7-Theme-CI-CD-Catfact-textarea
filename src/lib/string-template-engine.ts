function sanitize(string: string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;

  return string.replace(reg, (match) => (map[match as keyof typeof map]));
}
type TemplateBlock = string | number | boolean | null | undefined | TemplateBlock[] | {
  block: string,
  cls?: string | string[],
  attrs?: { [key: string]: string },
  content?: TemplateBlock | TemplateBlock[],
};

function stringTemplateEngine(templateWithData: TemplateBlock) {
  if (
    (templateWithData === undefined)
        || (templateWithData === null)
        || (templateWithData === false)
  ) {
    return '';
  }

  if ((typeof templateWithData === 'string') || (typeof templateWithData === 'number') || (templateWithData === true)) {
    return String(sanitize(templateWithData.toString()));
  }

  if (Array.isArray(templateWithData)) {
    let result = '';

    for (const templateItem of templateWithData) {
      result += stringTemplateEngine(templateItem);
    }

    return result;
  }

  let tag = `<${templateWithData.block}`;

  if (templateWithData.cls) {
    const classes = ([] as string[]).concat(templateWithData.cls).join(' ');

    tag += ` class="${classes}"`;
  }

  if (templateWithData.attrs) {
    for (const [key, value] of Object.entries(templateWithData.attrs)) {
      tag += ` ${key}="${sanitize(value)}"`;
    }
  }

  tag += '>';

  tag += stringTemplateEngine(templateWithData.content);

  tag += `</${templateWithData.block}>`;

  return tag;
}

export { stringTemplateEngine, TemplateBlock };
