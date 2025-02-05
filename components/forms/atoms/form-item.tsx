import { Input } from "@/components/ui/input";

type CustomFormItem<G> = {
  name: string;
  type: "text" | "number" | "email";
  description: string;
  label: string;
  onChange: (v: G) => void;
  value: G;
};

export const CustomFormItem = <
  G extends string | number | readonly string[] | undefined
>({
  name,
  type = "text",
  description,
  label,
  onChange,
  value = "",
}: CustomFormItem<G>) => {
  return (
    <div className="w-full">
      <label
        htmlFor="name"
        className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Input
        id={name}
        name="name"
        className="my-1"
        type={type}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value as unknown as G)
        }
      />
      <p className="text-[0.8rem] text-muted-foreground">{description}</p>
    </div>
  );
};
