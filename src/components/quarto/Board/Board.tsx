import { cn } from "@/lib/utils";

export interface Props {
  children: React.ReactNode;
}

export function Board({ children }: Props) {
  return (
    <div
      className={cn(
        "inline-grid grid-cols-4 gap-4 grid-rows-4 overflow-hidden border border-slate-300 bg-slate-50 rounded-lg p-4"
      )}
    >
      {children}
    </div>
  );
}
