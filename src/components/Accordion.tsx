import React from 'react';

interface AccordionProps {
  name: string;
  isOpen: boolean;
  onClick: () => void;
  picture: string; 
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ name, isOpen, onClick, picture, children }) => {
  return (
    <div className="border border-solid border-gray-300 rounded-xl shadow-sm mb-5 bg-gray-100 hover:bg-gray-200">
      <div
        className="flex justify-between items-center py-[10px] px-[20px] cursor-pointer "
        onClick={onClick}
      >
        <div className="flex items-center space-x-6">
          {picture && (
            <img
              src={picture}
              alt={`${name}'s profile`}
              className="w-[60px] h-[60px] rounded-full"
            />
          )}
          <h2 className="font-bold">{name}</h2> 
        </div>
        <button className="text-xl font-bold">{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && <div className="p-5 bg-gray-200">{children}</div>}
    </div>
  );
};

export default Accordion;
