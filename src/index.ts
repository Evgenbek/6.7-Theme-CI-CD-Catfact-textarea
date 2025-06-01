import { limitTextarea } from './components/limit-textarea/limit-textarea';
import './index.css';
import { helloWorld } from './lib/hello-world';

const message: string = 'app started';
console.log(message);

type CatFact = {
  length: number;
  fact: string;
};

fetch ('https://catfact.ninja/fact')
  .then((response) => response.json())
  .then((fact: CatFact) => {
    limitTextarea(
      document.body,
      {
        limit: 100,
        defaultText: helloWorld(`user! ${fact.fact}`),
        onSubmit: (value: string) => {
          document.body.textContent = value;
        },
      },
    );
  });