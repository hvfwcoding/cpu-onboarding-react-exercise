import dynamic from "next/dynamic";

const DesktopBreakpoint = dynamic(() => import("./Breakpoint"), { ssr: false });

export default function DesktopBreakpointWrapper(props) {
  return <DesktopBreakpoint name="desktop">{props.children}</DesktopBreakpoint>;
}
