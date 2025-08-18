import { useState, FC, ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: ReactNode;
}

export interface FAQAccordionProps {
  data: FAQItem[];
}

interface AccordionItemProps {
  index: number;
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  toggle: (index: number) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  index,
  question,
  answer,
  isOpen,
  toggle,
}) => (
  <div className="mb-4">
    <h2>
      <button
        type="button"
        className={`flex items-center justify-between w-full p-6 font-semibold text-left text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 ${
          isOpen ? "bg-[#f7c01b] text-black border-[#f7c01b]" : ""
        } focus:outline-none focus:ring-2 focus:ring-[#2166fc] focus:ring-offset-2`}
        aria-expanded={isOpen}
        onClick={() => toggle(index)}
      >
        <span className="text-lg">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } shrink-0 ${isOpen ? "text-black" : "text-[#2166fc]"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    {isOpen && (
      <div className="p-6 bg-white border border-gray-200 rounded-b-xl mt-2 shadow-sm">
        <div className="text-gray-700 leading-relaxed">
          {answer}
        </div>
      </div>
    )}
  </div>
);

export const FAQAccordion: FC<FAQAccordionProps> = ({ data }) => {
  const [openStates, setOpenStates] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const toggle = (index: number) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? !open : false))
    );
  };

  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          question={item.question}
          answer={item.answer}
          isOpen={openStates[index]}
          toggle={toggle}
        />
      ))}
    </div>
  );
};
