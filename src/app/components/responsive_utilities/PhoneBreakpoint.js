import dynamic from "next/dynamic";

const PhoneBreakpoint = dynamic(() => import("./Breakpoint"), { ssr: false });

export default function PhoneBreakpointWrapper(props) {
  return <PhoneBreakpoint name="phone">{props.children}</PhoneBreakpoint>;
}
