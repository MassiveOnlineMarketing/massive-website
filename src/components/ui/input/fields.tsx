
import React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
}

export interface CheckFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}


interface TestFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}


const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between  py-4 px-8 rounded-xl border border-gray-200",
          className
        )}
        {...props}
      />
    );
  }
);
InputField.displayName = "InputField";


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "inline-flex w-full mt-3 justify-between  py-4 px-8 rounded-xl border border-gray-200",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";



const CheckField = React.forwardRef<HTMLInputElement, CheckFieldProps>(
  ({ className, label, value, name, ...props }, ref) => {
    return (
      <label className={cn(
        'inline-flex justify-between  py-4 px-8 rounded-xl border border-gray-200 w-full',
        'hover:bg-gray-50',
        className
      )}>
        <p>{label}</p>
        <CheckInput {...props} value={value} name={name} />
      </label>
    );
  }
);
CheckField.displayName = "CheckField";



const CheckInput = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, name, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-4 w-4 my-auto rounded border-gray-300 accent-primary-500 focus:accent-primary-500",
        )}
        value={value}
        name={name}
        {...props}
      />
    );
  }
);
CheckInput.displayName = "CheckInput";


const TestInput = React.forwardRef<HTMLInputElement, TestFieldProps>(
  ({ className, label, value, ...props }, ref) => {
    return (
      <label className={cn(
        'inline-flex justify-between  py-4 px-8 rounded-xl border border-gray-200 w-full',
        'hover:bg-gray-50',
        className
      )}>
        <p>{label}</p>
        <input
          ref={ref}
          className={cn(
            "h-4 w-4 my-auto rounded border-gray-300 accent-primary-500 focus:accent-primary-500",
          )}
          value={value}
          {...props}
        />
      </label>
    );
  }
);
TestInput.displayName = "TestInput";
export { InputField, Textarea, CheckField, CheckInput, TestInput };  