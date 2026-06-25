import { summaryKeyPoints } from "../../data/data";

export default function SummaryTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-h">AI Generate Summary</h2>
      <h3 className="mt-3 font-medium text-text-h">Key Points</h3>
      <ul className="mt-2 space-y-2">
        {summaryKeyPoints.map((point, index) => (
          <li key={index} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
