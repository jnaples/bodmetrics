"use client";

import { useForm } from "react-hook-form";
import { Input } from "./input";

type Props = {
  register: ReturnType<typeof useForm>["register"];
  name: string;
};

export default function WeightInput() {
  
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    let value = input.value;

    if (/^\d*\.?\d{0,1}$/.test(value)) return;

    if (value.includes(".")) {
      const [intPart, decimalPart] = value.split(".");
      input.value = `${intPart}.${decimalPart.slice(0, 1)}`;
    } else {
      input.value = value;
    }
  };

  return <Input type="number" step="0.1" onInput={handleInput} />;
}
