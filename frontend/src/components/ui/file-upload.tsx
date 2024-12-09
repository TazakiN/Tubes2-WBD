import React, { useState, useRef, forwardRef, useImperativeHandle} from 'react';
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  inputName?: string;
  buttonText?: string;
  className?: string;
  onFileSelect?: (file: File) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>((props, ref) => {
  const { inputName, buttonText = 'Upload File', className = '', onFileSelect } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);

  useImperativeHandle(ref, () => ({
    get value() {
      return inputRef.current?.value || '';
    },
    get name() {
      return inputRef.current?.name || '';
    },
    get files() {
      return inputRef.current?.files;
    }
  }));

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={handleButtonClick}
        className={`flex flex-col items-center ${className}`}
      >
        {buttonText}
      </Button>
      <input
        type="file"
        ref={inputRef}
        name={inputName}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
});

export default FileUpload;