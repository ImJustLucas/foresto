import { cn } from "@/lib/utils";

type TypographyType = {
  children: React.ReactNode;
  bold?: boolean;
};

export const TypographyH3: React.FC<TypographyType> = ({
  children,
  bold = true,
}) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl tracking-tight",
        bold && "font-semibold"
      )}
    >
      {children}
    </h3>
  );
};

export const TypographyH4: React.FC<TypographyType> = ({
  children,
  bold = true,
}) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl tracking-tight",
        bold && "font-semibold"
      )}
    >
      {children}
    </h3>
  );
};

export const TypographyP: React.FC<TypographyType> = ({
  children,
  bold = true,
}) => {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        bold && "font-medium"
      )}
    >
      {children}
    </p>
  );
};

export const TypographyMuted: React.FC<TypographyType> = ({
  children,
  bold = true,
}) => {
  return (
    <p className={cn("leading-7 text-muted-foreground", bold && "font-medium")}>
      {children}
    </p>
  );
};
