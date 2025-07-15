import type { ComponentProps } from "react";

type Variant = "primary" | "danger";

type Button = ComponentProps<"button"> & {
  variant?: Variant;
};

function Button({ children, variant, style, className, ...rest }: Button) {
  return (
    <button
      style={{
        borderRadius: "50px",
        cursor: "pointer",
        transitionDuration: "0.3s",
        ...style,
        ...checkVariant(variant),
      }}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

function checkVariant(variant?: Variant) {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: "#1182C5",
        color: "white",
      };
    case "danger":
      return {
        backgroundColor: "#e53d3d",
        color: "white",
      };
  }
}
export default Button;
