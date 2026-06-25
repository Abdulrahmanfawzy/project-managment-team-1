import { notes } from "../../data/data";

export default function NotesTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-h">Notes</h2>
      <ul className="mt-3 space-y-3">
        {notes.map((note, index) => (
          <li
            key={index}
            className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-muted-foreground"
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
