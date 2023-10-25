import { ReactNode } from 'react';
import './actions.scss';

function Actions(props: {
  children: ReactNode
}) {
  return (
    <nav className='actions'>
      {props.children}
    </nav>
  );
}

export default Actions;
