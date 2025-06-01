import { stringTemplateEngine } from '../../lib/string-template-engine';
import { limitTextarea } from './limit-textarea';

jest.mock('../../lib/string-template-engine');

(stringTemplateEngine as jest.Mock).mockReturnValue('test');

test('render limit-textarea', () => {
//   const insertAdjacentHTMl = jest.fn();

  limitTextarea(
    {
      insertAdjacentHTML: (where: string, html: string) => {
        console.log(where);
        console.log(html);
      },
      //   insertAdjacentHTMl,
      querySelector: () => {},
    } as unknown as HTMLElement,
    {
      defaultText: 'test',
      limit: 10,
      onSubmit: () => {},
    },
  );

  expect(stringTemplateEngine).toHaveBeenCalledTimes(1);
  expect(stringTemplateEngine).toHaveBeenCalledWith({
    block: 'div',
    cls: 'limit-textarea',
    content: [
      {
        block: 'textarea',
        cls: 'limit-textarea__control',
        attrs: {
          role: 'textbox',
        },
        content: 'test',
      },
      {
        block: 'div',
        cls: 'limit-textarea__left',
        content: 'Осталось 6 символов',
      },
      {
        block: 'button',
        cls: 'limit-textarea__button',
        content: 'OK',
      },
    ],
  });

//   expect(insertAdjacentHTMl).toHaveBeenCalledTimes(1);
//   expect(insertAdjacentHTMl).toHaveBeenCalledWith('beforeend', 'test');
});
