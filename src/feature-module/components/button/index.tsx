import React from 'react';
import './styles.scss';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  className = '',
  backgroundColor = 'white',
  textColor = '#007bff',
  ...props
}) => {
  // Inline styles to override default styles
  const buttonStyles = {
    backgroundColor,
    color: textColor,
    borderColor: textColor,
  };

  return (
    <button className={`custom-button ${className}`} onClick={onClick} style={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
