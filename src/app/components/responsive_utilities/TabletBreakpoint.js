import dynamic from "next/dynamic";

const TabletBreakpoint = dynamic(() => import("./Breakpoint"), { ssr: false });

export default function TabletBreakpointWrapper(props) {
  return <TabletBreakpoint name="tablet">{props.children}</TabletBreakpoint>;
}
