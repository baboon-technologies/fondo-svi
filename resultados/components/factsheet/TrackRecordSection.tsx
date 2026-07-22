export function TrackRecordSection() {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>Track Record - David Sánchez Molina</h3>
      </div>
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm" style={{ borderColor: 'var(--svi-light-gray)' }}>
        <img
          src="/deck/track-record-david.png"
          alt="Track record de David Sánchez Molina"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
