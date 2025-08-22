import React from "react";
import { useInView } from "../../hooks/useInView";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  delayMs?: number;   // độ trễ từng item (ms)
};

export default function Reveal({ children, className = "", delayMs = 100, ...rest }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  // motion-safe: chỉ animate khi user không bật "reduce motion"
  const base =
    "will-change-transform motion-safe:transition motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]";
  const from = "opacity-0 translate-y-10";
  const to = "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`${base} ${inView ? to : from} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
