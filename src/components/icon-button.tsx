import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
  disabled?: boolean;
}

export function IconButton({
  transparent,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-md border border-white/10 p-1.5 
      ${transparent === true ? "bg-black/20" : " bg-white/10"}
      ${disabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    />
  );
}
