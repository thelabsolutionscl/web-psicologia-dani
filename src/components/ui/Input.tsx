import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldClasses =
  "w-full min-h-11 rounded-lg border border-arena bg-white px-4 py-2.5 font-sans text-base text-quebrada placeholder:text-quebrada/50 aria-[invalid=true]:border-anahuaca";

type CommonProps = {
  label: string;
  name: string;
  error?: string;
};

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1 font-sans text-sm font-semibold text-anahuaca">
      {error}
    </p>
  );
}

function Label({ htmlFor, label }: { htmlFor: string; label: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-sans text-base font-semibold text-quebrada"
    >
      {label}
    </label>
  );
}

export function InputField({
  label,
  name,
  error,
  ...rest
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses}
        {...rest}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  error,
  ...rest
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${name}-error`;
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses}
        {...rest}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  options,
  ...rest
}: CommonProps & { options: readonly string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  const errorId = `${name}-error`;
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses}
        {...rest}
      >
        <option value="">Selecciona una opción…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={errorId} error={error} />
    </div>
  );
}
