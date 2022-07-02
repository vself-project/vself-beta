import React, { useState, useEffect } from 'react';

interface AccordionProps {
  accordionTitle: string;
  activeIndex: number;
  currentIndex: number;
  activeIndexCallback: (index: number) => void;
  children: React.ReactElement;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  accordionTitle,
  activeIndex,
  currentIndex,
  activeIndexCallback,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggleCollapsed = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const id = (event.target as HTMLButtonElement).id;
    const element = document.getElementById(id);
    element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsCollapsed(!isCollapsed);
    activeIndexCallback(currentIndex);
  };
  useEffect(() => {
    if (activeIndex === currentIndex) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [activeIndex, currentIndex]);

  return (
    <div className="flex w-full rounded-t-lg accordion-item flex-col py-2 border-b border-gray-200">
      <button
        type="button"
        onClick={toggleCollapsed}
        className={`${!isCollapsed && 'font-bold'} flex text-black`}
        id={`accordion_${currentIndex}`}
      >
        {accordionTitle}
      </button>
      <div
        className="justify-center origin-top accordion-collapse content-center items-center flex transition-height duration-500 ease-in-out overflow-y-hidden"
        style={{
          height: isCollapsed ? 0 : 500,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
