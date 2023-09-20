import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 8,
      blocksSeed: 0,
      phase: "ready",
      start: () => {
        set((state) =>
          state.phase === "ready" ? { phase: "playing", startTime: Date.now() } : {}
        );
      },
      restart: () => {
        set((state) =>
          state.phase === "playing" || state.phase === "ended"
            ? { phase: "ready", blocksSeed: Math.random() }
            : {}
        );
      },
      end: () => {
        set((state) => (state.phase === "playing" ? { phase: "ended", endTime: Date.now() } : {}));
      },
    };
  })
);
