type PieSlice = {
  label: string;
  value: number;
  color: string;
};

const PIE_COLORS = [
  "#d96c47",
  "#6f8a5c",
  "#4e7a8c",
  "#d2a24c",
  "#9a6e8f",
  "#5f6b7a",
  "#c86b6b",
  "#7a9e7e",
];

function buildChartBackground(data: PieSlice[]) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  let current = 0;

  const stops = data.map((slice) => {
    const start = (current / total) * 360;
    current += slice.value;
    const end = (current / total) * 360;
    return `${slice.color} ${start}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

export default function SpendingPieChart({
  data,
  title,
}: {
  data: Array<{ label: string; value: number }>;
  title: string;
}) {
  const chartData = data.map((slice, index) => ({
    ...slice,
    color: PIE_COLORS[index % PIE_COLORS.length],
  }));
  const total = chartData.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <section className="chartCard">
      <div className="chartCard__header">
        <h2>{title}</h2>
        <span>{total}</span>
      </div>

      <div className="chartCard__body">
        <div
          aria-label={title}
          className="chartCard__pie"
          role="img"
          style={{ background: buildChartBackground(chartData) }}
        >
          <div className="chartCard__pieCenter">
            <span>Всего</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="chartCard__legend">
          {chartData.map((slice) => (
            <div className="chartCard__legendItem" key={slice.label}>
              <span
                className="chartCard__legendColor"
                style={{ backgroundColor: slice.color }}
              />
              <span className="chartCard__legendLabel">{slice.label}</span>
              <span className="chartCard__legendValue">{slice.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
