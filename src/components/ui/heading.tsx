import clsx from "clsx";
import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";

export type HeadingLevel =
  | "custom"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6";
type HeadingColor = "auto" | "custom" | "dark" | "light";

const headingLevelsClasses: Record<HeadingLevel, string> = {
  custom: "",
  heading1: clsx(
    "lg:text-6xl lg:tracking-tighter lg:leading-[4rem] lg:font-extrabold",
    "sm:text-5xl sm:tracking-tight sm:font-bold",
    "text-4xl tracking-tight font-bold",
  ),
  heading2: clsx(
    "lg:text-5xl lg:tracking-tighter lg:font-bold",
    "sm:text-4xl sm:tracking-tight sm:font-bold",
    "text-3xl tracking-tight font-bold",
  ),
  heading3: clsx(
    "lg:text-4xl lg:tracking-tighter lg:font-bold",
    "sm:text-3xl sm:tracking-tight sm:font-bold",
    "text-2xl tracking-tight font-semibold",
  ),
  heading4: clsx(
    "lg:text-3xl lg:tracking-tight lg:font-bold",
    "sm:text-2xl sm:font-semibold",
    "text-xl font-semibold",
  ),
  heading5: clsx(
    "lg:text-2xl lg:font-semibold",
    "sm:text-xl sm:font-semibold",
    "text-lg font-semibold",
  ),
  heading6: clsx(
    "lg:text-xl lg:font-semibold",
    "sm:text-lg sm:font-semibold",
    "text-base font-semibold",
  ),
};

function colorClass(color: HeadingColor) {
  return {
    auto: "text-slate-900 dark:text-slate-100",
    custom: "",
    dark: "text-slate-900 dark:text-slate-100",
    light: "text-white",
  }[color];
}

type Props = HTMLAttributes<HTMLHeadingElement> &
  Readonly<{
    className?: string;
    color?: HeadingColor;
    level: HeadingLevel;
    tag: string;
  }>;

function Heading(
  {
    level: visualLevel,
    color = "auto",
    className,
    tag: HeadingTag,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  return (
    <HeadingTag
      // @ts-expect-error TS doesn't know the tags are h1/h2/etc.
      ref={ref}
      className={clsx(
        headingLevelsClasses[visualLevel],
        colorClass(color),
        className,
      )}
      {...props}
    />
  );
}

export default forwardRef(Heading);
