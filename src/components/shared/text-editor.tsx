import ReactQuill from "react-quill-new";
import { useState } from "react";

import "react-quill-new/dist/quill.snow.css";

type TextEditorProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [text, setText] = useState(value || "");

  const handleChange = (value: string) => {
    setText(value);
    onChange(value);
  };

  return (
    <ReactQuill
      value={text}
      onChange={handleChange}
      theme="snow"
      style={{ height: 200 }}
    />
  );
};

export default TextEditor;
