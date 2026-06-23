export default function ProjectTabPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-xl font-semibold text-text-h">{title}</h2>
      <p className="text-sm text-muted-foreground">This tab is coming soon.</p>
    </div>
  );
}
