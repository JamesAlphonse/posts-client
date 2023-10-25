import { ReactNode } from 'react';
import './button.scss';

function CButton(props: {
  children: ReactNode,
  text?: string,
  onClick: any,
  type: 'button' | 'submit'
}) {
  return (
    <button
      className='button'
      onClick={props.onClick}
      type={props.type}>
      {props.children}
      {props.text && <span>{props.text}</span>}
    </button>
  );
}

export default CButton;
