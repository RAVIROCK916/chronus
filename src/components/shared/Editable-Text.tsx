type EditableTextProps = {
  children: React.ReactNode;
};

export const EditableText = ({ children }: EditableTextProps) => {
  return (
    <div
      contentEditable
      className="w-full rounded-md p-2 px-4 transition-colors hover:bg-neutral-950"
    >
      {children}
    </div>
  );
};
