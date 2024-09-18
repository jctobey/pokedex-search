import { classNames } from "../../../../../../utils";

const STAT_BAR_MAX = 200;

export const StatIndicator = ({
  stat,
  statValue,
  textColorClass,
  bgColorClass,
}: {
  stat: string;
  statValue: number;
  textColorClass?: string;
  bgColorClass?: string;
}) => {
  const paddedStatValue = String(statValue).padStart(3, "0");
  return (
    <div className="flex w-full gap-2 items-center">
      <span
        className={classNames(
          "px-2 border-r border-r-grayscale-light text-right",
          textColorClass
        )}
      >
        {stat}
      </span>
      <span>{paddedStatValue}</span>
      <div className="grow">
        <progress
          max={STAT_BAR_MAX}
          value={statValue}
          className={classNames("w-full h-1", bgColorClass)}
        />
      </div>
    </div>
  );
};
