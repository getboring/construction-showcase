import { useCallback, useState, useRef } from "react";
import { cn } from "../../../lib/cn";

interface FileUploadProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  error?: boolean;
  className?: string;
  onChange?: (files: FileList | null) => void;
}

export function FileUpload({ name, label, accept, multiple = false, error = false, className, onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragover, setDragover] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      setFilenames(Array.from(files).map((f) => f.name));
      onChange?.(files);
    },
    [onChange],
  );

  return (
    <div className={className}>
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400 mb-3 block">{label}</label>
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          dragover ? "border-amber-500 bg-amber-500/5" : "border-steel-700 hover:border-amber-500/50",
          error && "border-red-500/50",
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
        onDragLeave={() => setDragover(false)}
        onDrop={(e) => { e.preventDefault(); setDragover(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          id={name}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {filenames.length > 0 ? (
          <div className="space-y-1">
            {filenames.map((f) => (
              <p key={f} className="text-sm text-amber-500">{f}</p>
            ))}
            <p className="font-mono text-[10px] text-steel-500 mt-2">Click or drag to replace</p>
          </div>
        ) : (
          <>
            <p className="text-steel-400 text-sm">Drop files here or click to browse</p>
            <p className="font-mono text-[10px] text-steel-600 mt-2">
              {accept ? `Accepted: ${accept}` : "Any file type"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}