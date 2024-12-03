import { useRef, useState } from "react";

interface TextAreaProps {
    placeholder?: string;
    maxLength?: number;
    initialRow?: number;
    id: string;
}

const TextArea = ({placeholder, maxLength, id, initialRow} : TextAreaProps) => {
    if (!placeholder){
        placeholder = "";
    }

    const [text, setText] = useState(placeholder);
    const textAreaRef = useRef(null);

    const handleInput = (e) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
          setText(value);
          // Adjust height dynamically
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
          value={text}
          onInput={handleInput}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          rows={initialRow}
          style={{ height: "auto" }}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-dark/80">
          {text.length}/{maxLength}
        </div>
      </div>
    );
  };
  
  export default TextArea;