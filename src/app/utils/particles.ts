import { MouseEvent } from "react";

export function burstFromEvent(
  event: MouseEvent,
  burst: (x: number, y: number, quantity?: number) => void,
  quantity = 20
) {
  burst(event.clientX, event.clientY, quantity);
}
