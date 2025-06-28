"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Toggle } from "../ui/toggle";
import {
  Bold,
  CaseSensitive,
  ChevronDownIcon,
  Code,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Paintbrush,
  PaintRoller,
  Palette,
  Quote,
  Strikethrough,
  Type,
  UnderlineIcon,
} from "lucide-react";
import { VscTextSize } from "react-icons/vsc";
import { BiSolidQuoteRight } from "react-icons/bi";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const TEXT_COLORS = [
  { name: "Default", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Gray", value: "#6b7280" },
];

const HIGHLIGHT_COLORS = [
  { name: "None", value: "" },
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Purple", value: "#e9d5ff" },
  { name: "Pink", value: "#fbcfe8" },
  { name: "Orange", value: "#fed7aa" },
  { name: "Red", value: "#fecaca" },
  { name: "Gray", value: "#e5e7eb" },
];

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [value, setValue] = useState("left");

  if (!editor) {
    return null;
  }

  // Function to get current heading level or paragraph
  const getCurrentHeadingLevel = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
    return "paragraph";
  };

  // Function to set heading level
  const setHeading = (level: Level | null) => {
    if (level === null) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  // Function to set text color
  const setTextColor = (color: string) => {
    if (color === "#000000") {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  // Function to set highlight color
  const setHighlightColor = (color: string) => {
    if (color === "") {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  // Get current text color
  const getCurrentTextColor = () => {
    const color = editor.getAttributes("textStyle").color;
    return color || "#000000";
  };

  // Get current highlight color
  const getCurrentHighlightColor = () => {
    const highlight = editor.getAttributes("highlight");
    return highlight.color || "";
  };

  return (
    <div className="control-group border-b p-1">
      <div className="flex items-center gap-2">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 justify-between gap-1 px-2"
              >
                <span className="text-sm">
                  <VscTextSize />
                </span>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[180px]">
              <DropdownMenuItem
                onClick={() => setHeading(null)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "paragraph" ? "bg-accent" : ""
                }`}
              >
                <span className="text-sm">Paragraph</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(1)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h1" ? "bg-accent" : ""
                }`}
              >
                <span className="text-xl font-bold">Heading 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(2)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h2" ? "bg-accent" : ""
                }`}
              >
                <span className="text-lg font-semibold">Heading 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(3)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h3" ? "bg-accent" : ""
                }`}
              >
                <span className="text-base font-semibold">Heading 3</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(4)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h4" ? "bg-accent" : ""
                }`}
              >
                <span className="text-sm font-semibold">Heading 4</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(5)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h5" ? "bg-accent" : ""
                }`}
              >
                <span className="text-sm font-medium">Heading 5</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setHeading(6)}
                className={`cursor-pointer ${
                  getCurrentHeadingLevel() === "h6" ? "bg-accent" : ""
                }`}
              >
                <span className="text-xs font-medium">Heading 6</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
            aria-label="Toggle bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-state={editor.isActive("italic") ? "on" : "off"}
            aria-label="Toggle italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.commands.toggleUnderline()}
            data-state={editor.isActive("underline") ? "on" : "off"}
            aria-label="Toggle underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-state={editor.isActive("strike") ? "on" : "off"}
            aria-label="Toggle strike"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative h-8 px-2"
                aria-label="Text color"
              >
                <Highlighter className="h-4 w-4" />
                <div
                  className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 transform rounded-full"
                  style={{ backgroundColor: getCurrentTextColor() }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[220px] p-0">
              <div className="p-3">
                <div className="mb-2 text-sm font-medium">Text Color</div>
                <div className="grid grid-cols-5 gap-2">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTextColor(color.value)}
                      className={`group relative h-8 w-8 rounded-md shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md ${
                        getCurrentTextColor() === color.value
                          ? "border-gray-800 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {getCurrentTextColor() === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative ml-1 h-8 px-2"
                aria-label="Highlight color"
              >
                <PaintRoller className="h-4 w-4" />
                <div
                  className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 transform rounded-full"
                  style={{
                    backgroundColor: getCurrentHighlightColor() || "#e5e7eb",
                    opacity: getCurrentHighlightColor() ? 1 : 0.5,
                  }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] p-0">
              <div className="p-3">
                <div className="mb-2 text-sm font-medium">Background Color</div>
                <div className="grid grid-cols-4 gap-2">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color.value || "none"}
                      onClick={() => setHighlightColor(color.value)}
                      className={`group relative h-8 w-8 rounded-md border-2 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md ${
                        getCurrentHighlightColor() === color.value
                          ? "border-gray-800 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.value || "#ffffff",
                        backgroundImage:
                          color.value === ""
                            ? "linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%), linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%)"
                            : "none",
                        backgroundSize: color.value === "" ? "6px 6px" : "auto",
                        backgroundPosition:
                          color.value === "" ? "0 0, 3px 3px" : "auto",
                      }}
                      title={color.name}
                    >
                      {getCurrentHighlightColor() === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-gray-800 shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem
            size="sm"
            value="left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <AlignLeftIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size="sm"
            value="center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <AlignCenterIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size="sm"
            value="right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <AlignRightIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
            aria-label="Toggle bullet list"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
            aria-label="Toggle ordered list"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            data-state={editor.isActive("code") ? "on" : "off"}
            aria-label="Toggle code"
          >
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-state={editor.isActive("blockquote") ? "on" : "off"}
            aria-label="Toggle blockquote"
          >
            <BiSolidQuoteRight className="h-4 w-4" />
          </Toggle>
        </div>
        {/* <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
          Highlight
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
          Left
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
          Center
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
          Right
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
          Justify
        </button> */}
      </div>
    </div>
  );
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Tiptap = ({ value, onChange }: Props) => {
  const editor = useEditor({
    content: value || "<h1>Hello World!</h1>",
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class:
              "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono dark:bg-gray-800",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-gray-800 p-4 rounded-md border overflow-x-auto",
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert outline-none p-3 min-h-96",
      },
    },
  });

  useEffect(() => {
    handleChange(editor?.getHTML() || "");
  }, [editor?.getHTML()]);

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="rounded border">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
