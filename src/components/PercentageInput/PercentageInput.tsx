import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface PercentageInputProps extends React.HTMLProps<HTMLInputElement> {
  initialValue?: number | string;
  onValueChange?: (value: number) => void;
}

export const PercentageInput: React.FC<PercentageInputProps> = (props) => {
  const { onValueChange, initialValue, className, ...divProps } = props;

  const [value, setValue] = useState(initialValue || '0.1');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let parsedValue: number;

    if (typeof value === 'string') {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = value;
    }

    onValueChange?.(parsedValue);
  }, [value, onValueChange]);

  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    if (!target.closest('button')) {
      inputRef.current?.focus();
    }
  };

  const handleOnChange = (inputValue: string) => {
    if (inputValue === '') {
      setValue(0);
      return;
    }

    const newPercentage = parseFloat(inputValue);

    if (newPercentage <= 100 && newPercentage >= 0) {
      setValue(newPercentage);
    }
  };

  const increaseValue = () => {
    if (inputRef.current) {
      inputRef.current.stepUp();
      handleOnChange(inputRef.current.value);
    }
  };

  const decreaseValue = () => {
    if (inputRef.current) {
      inputRef.current.stepDown();
      handleOnChange(inputRef.current.value);
    }
  };

  return (
    <div
      className={cn('inline-flex items-center border rounded-lg px-3 py-2', className)}
      {...divProps}
      onClick={focusInput}
    >
      <input
        ref={inputRef}
        className="text-right no-spinner px-1 outline-none text-2xl"
        type="number"
        max="100"
        min="0"
        step="0.1"
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <span className="text-2xl">%</span>
      <div className="flex flex-col ml-4">
        <button className="rounded-t-lg border h-6 w-[22px] flex justify-center items-center" onClick={increaseValue}>
          <ChevronUp size={16} />
        </button>
        <button
          className="rounded-b-lg border h-6 mt-[-1px] w-[22px] flex justify-center items-center"
          onClick={decreaseValue}
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};
