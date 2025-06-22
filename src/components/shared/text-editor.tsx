import ReactQuill from "react-quill-new";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

import "@/styles/text-editor.css";
import "react-quill-new/dist/quill.snow.css";

type TextEditorProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

const TextEditor = ({
  value,
  onChange,
  className,
  placeholder = "Write something...",
}: TextEditorProps) => {
  const [text, setText] = useState(value || "");

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
				[{ size: [] }],
				[{ font: [] }],
				[{ align: ["right", "center", "justify"] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "code-block"],
        ["clean"],
      ],
    }),
    [],
	);
	
	const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleChange = (value: string) => {
    setText(value);
    onChange(value);
  };

  return (
    <div className={cn("text-editor-container", className)}>
      <ReactQuill
        value={text}
        onChange={handleChange}
        theme="snow"
				modules={modules}
				formats={formats}
        placeholder={placeholder}
        className="rounded-md border border-input bg-background text-sm ring-offset-background"
      />
    </div>
  );
};

export default TextEditor;
