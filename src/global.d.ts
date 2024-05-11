// global.d.ts

interface Window {
  gtag: (command: string, targetId: string, config: object) => void;
}
