import { useRef } from "react";

interface TextAreaProps {
    value: string;
    onChange;
    placeholder?:string;
    maxLength?: number;
    initialRow?: number;
    id: string;
}

const TextArea = ({value="", onChange, placeholder, maxLength, id, initialRow} : TextAreaProps) => {
    const textAreaRef = useRef(null);

    const handleInput = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= maxLength) {
          // setText(value);
          onChange(newValue);
          if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
          }
        }
      };

    return (
        <div className="relative flex flex-col p-4 w-full max-w bg-white border-2 border-gray-dark rounded-lg">
        <textarea
          id={id}
          ref={textAreaRef}
          className="w-full bg-transparent border-none outline-none resize-none text-gray-dark"
          maxLength={maxLength}
          value={value}
          onInput={handleInput}
          placeholder={placeholder}
          rows={initialRow}
          style={{ height: "auto" }}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-dark/80">
          {value.length}/{maxLength}
        </div>
      </div>
    );
  };
  
  export default TextArea;