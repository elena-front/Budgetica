export default function CategorySpendChart({
  spent,
  limit,
}: {
  spent: number;
  limit: number;
}) {
  const safeLimit = limit > 0 ? limit : Math.max(spent, 1);
  const cappedPercent = Math.min((spent / safeLimit) * 100, 100);
  const isOverspent = spent > limit && limit > 0;

  return (
    <div className="categoryChart">
      <div
        aria-label="Прогресс расходов по категории"
        className={`categoryChart__ring ${isOverspent ? "categoryChart__ring--danger" : ""}`}
        role="img"
        style={{
          background: `conic-gradient(${
            isOverspent ? "#b94b4b" : "#d96c47"
          } 0 ${cappedPercent}%, #efe5d8 ${cappedPercent}% 100%)`,
        }}
      >
        <div className="categoryChart__center">
          <strong>{Math.round((spent / safeLimit) * 100)}%</strong>
        </div>
      </div>
    </div>
  );
}
