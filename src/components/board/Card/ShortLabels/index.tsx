export type ShortLabelsProps = {
  colors: string[];
};

export const ShortLabels = ({ colors }: ShortLabelsProps) => {
  return (
    <div className="grid grid-cols-5 gap-1 grid-flow-row">
      {colors.map(color => (
        <div key={color} className="inline-block h-2 w-10 rounded-xl" style={{ background: color }} />
      ))}
    </div>
  );
};
