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
          "px-2 border-r-2 border-r-grayscale-light text-right w-14 font-semibold text-xs",
          textColorClass
        )}
      >
        {stat}
      </span>
      <span className="text-xs w-6">{paddedStatValue}</span>
      <div className="grow">
        <div className="relative w-full h-1 bg-gray-200 rounded overflow-hidden">
          <div
            className={classNames(
              "absolute top-0 left-0 h-full rounded",
              bgColorClass
            )}
            style={{ width: `${(statValue / STAT_BAR_MAX) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
