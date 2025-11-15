"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui";

interface PinModalProps {
  onClose: () => void;
  onConfirm: (pin: string) => void;
  isLoading?: boolean;
}

export const PinModal = ({ onClose, onConfirm, isLoading }: PinModalProps) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const pinString = pin.join("");
    if (pinString.length === 4) {
      onConfirm(pinString);
    }
  };

  const isComplete = pin.every((digit) => digit !== "");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 w-full max-w-[541px] flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 items-center w-full">
            <h2 className="text-base md:text-lg font-bold text-neutral-800 dark:text-neutral-50 text-center">
              Enter your Transaction PIN
            </h2>

            <div className="flex flex-col gap-2 items-start">
              <label className="text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-50">
                Enter PIN
              </label>

              <div className="flex gap-4 md:gap-6 items-center">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 md:w-[43px] md:h-[40px] border border-neutral-800 dark:border-neutral-300 rounded text-center text-lg md:text-xl font-medium text-neutral-800 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    style={
                      {
                        WebkitTextSecurity: digit ? "disc" : "none",
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              <button
                onClick={onClose}
                className="text-sm md:text-base font-medium text-primary-500 dark:text-primary-400 w-full text-right hover:underline"
              >
                Forgot PIN?
              </button>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className="w-full rounded-lg bg-primary-500 hover:bg-primary-500/90 text-white"
        >
          {isLoading ? "Processing..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

