import React from "react";
import './styles.scss';

type Props = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
};

const Button = ({text, onClick}: Props) => (
  <div>
    <button className="btn-button" onClick={onClick}>
      <h5 className="btn-text" >{text}</h5>
    </button>
    
  </div>
);


export default Button;
