import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] outline-none border-none text-primary bg-transparent p-2 prose prose-neutral dark:prose-invert prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full max-w-2xl rounded-lg border bg-background">
      {/* Toolbar */}

      <div className="flex gap-2 border-b p-2">
        {/* Bold */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>

        {/* Italic */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>

        {/* Underline */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-muted" : ""}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        {/* Strike */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-muted" : ""}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        {/* Unordered List */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log("Toggling bullet list");
            const result = editor.chain().focus().toggleBulletList().run();
            console.log("Result:", result);
          }}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>

        {/* Ordered List */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[150px] p-2" />
    </div>
  );
}
