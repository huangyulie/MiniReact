// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import createElement from './MyReact/createElement';
import render from './MyReact/render';

const element = createElement(
  'div',
  {
    title:'halo'
  },
  createElement(
    'a',null,'asdsad'
  )
)

console.log(element);
const root = document.getElementById('root');

render(
  element,
  root
)
