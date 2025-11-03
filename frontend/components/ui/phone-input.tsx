"use client";

import { maskPhone } from "@/utils/masks";
import { ChangeEvent } from "react";

interface PhoneInputProps {
  label?: string;
  error?: string;
  register: any;
  name: string;
}

export function PhoneInput({ label, error, register, name }: PhoneInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        type="tel"
        inputMode="numeric"
        placeholder="(11) 91234-5678"
        className={`border rounded-lg px-3 py-1 h-9 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = maskPhone(e.target.value);
          },
        })}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}