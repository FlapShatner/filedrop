import { cn } from '../../lib/cn';
import { DURATIONS } from '../../../constants';
import { useFileContext } from '../context/file-context';

type DurationOptionProps = {
  value: number;
  label: string;
  selected: number;
  onChange: (value: number) => void;
};

function DurationOption({
  value,
  label,
  selected,
  onChange,
}: DurationOptionProps) {
  const isSelected = selected === value;
  return (
    <div
      className={cn(
        'flex items-center justify-center w-18 rounded-md cursor-pointer',
        isSelected && 'bg-accent'
      )}
    >
      <input
        type="radio"
        id={`duration-${value}`}
        name="duration"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <label
        htmlFor={`duration-${value}`}
        className={cn(
          'text-text opacity-50 text-sm font-raleway cursor-pointer',
          isSelected && 'font-bold opacity-100'
        )}
      >
        {label}
      </label>
    </div>
  );
}

function ExpireIn() {
  const { expireIn, setExpireIn } = useFileContext();

  return (
    <div className="flex items-center justify-center ">
      <div>Expire In:</div>
      <div className="flex justify-center items-center  ml-4 rounded-lg bg-accent/10 border border-accent blur-bg">
        {DURATIONS.map((duration) => (
          <DurationOption
            key={duration.value}
            value={duration.value}
            label={duration.label}
            selected={expireIn}
            onChange={setExpireIn}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpireIn;
