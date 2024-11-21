import React, { useCallback, useRef } from "react";

interface VerificationCodeInputProps {
  onComplete: (code: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onComplete,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const addToRefs = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      if (!el || inputsRef.current.includes(el)) return;
      inputsRef.current.splice(index, 0, el);
    },
    [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;

    if (value.length > 1) {
      return;
    }

    if (value) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }

    const code = inputsRef.current.map((input) => input?.value).join("");

    if (code.length === 6) {
      onComplete(code);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (/^\d{6}$/.test(pastedData)) {
      inputsRef.current.forEach((input) => {
        if (input) {
          input.value = "";
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });

      pastedData.split("").forEach((digit, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index]!.value = digit;
          inputsRef.current[index]!.dispatchEvent(
            new Event("input", { bubbles: true }),
          );
        }
      });
      inputsRef.current[5]?.focus();
      onComplete(pastedData);
    }
  };

  const handleFocus = (index: number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]!.select();
    }
  };

  return (
    <div className="flex flex-row gap-2 justify-center" onPaste={handlePaste}>
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => addToRefs(el, index)}
          className="w-12 h-12 text-center border border-divider rounded-lg"
          maxLength={1}
          name={"code"}
          onChange={(e) => handleChange(e, index)}
          onFocus={() => handleFocus(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
