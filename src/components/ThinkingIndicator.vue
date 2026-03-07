<template>
  <div
    class="thinking-shell inline-flex min-h-11 items-center gap-3 rounded-2xl border border-outline bg-surface-card px-3.5 py-2 text-on-surface-muted"
    aria-label="Assistant is thinking"
    role="status"
  >
    <span class="thinking-avatar" aria-hidden="true">
      <span class="thinking-avatar-ring" />
      <span class="thinking-orb" />
    </span>
    <span class="thinking-track" aria-hidden="true">
      <span class="thinking-dot thinking-dot-delay-1" />
      <span class="thinking-dot thinking-dot-delay-2" />
      <span class="thinking-dot thinking-dot-delay-3" />
    </span>
    <span class="thinking-text">Thinking</span>
    <span class="sr-only">Thinking...</span>
  </div>
</template>

<style scoped>
.thinking-shell {
  animation: shellFloat 1.8s ease-in-out infinite;
  box-shadow: 0 10px 30px rgb(2 6 23 / 0.2);
}

.thinking-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
}

.thinking-avatar-ring {
  position: absolute;
  inset: -0.2rem;
  display: block;
  border-radius: 9999px;
  border: 1px solid rgb(56 189 248 / 0.35);
  animation: ringPulse 1.6s ease-out infinite;
}

.thinking-orb {
  position: relative;
  display: block;
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, rgb(125 211 252), rgb(14 165 233));
  box-shadow:
    0 0 0 0 rgb(56 189 248 / 0.55),
    0 0 18px rgb(56 189 248 / 0.45);
  animation: orbPulse 1.2s ease-in-out infinite;
}

.thinking-track {
  position: relative;
  display: block;
  width: 2.8rem;
  height: 1rem;
  overflow: hidden;
}

.thinking-dot {
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  width: 0.42rem;
  height: 0.42rem;
  margin-top: -0.21rem;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgb(226 232 240), rgb(148 163 184));
  box-shadow: 0 0 12px rgb(148 163 184 / 0.25);
  animation: dotTravel 1.5s cubic-bezier(0.55, 0.1, 0.45, 0.9) infinite;
}

.thinking-dot-delay-1 {
  animation-delay: 0s;
}

.thinking-dot-delay-2 {
  animation-delay: 0.24s;
}

.thinking-dot-delay-3 {
  animation-delay: 0.48s;
}

.thinking-text {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  opacity: 0.95;
  animation: textPulse 1.4s ease-in-out infinite;
}

@keyframes orbPulse {
  0% {
    transform: scale(0.92);
    box-shadow:
      0 0 0 0 rgb(56 189 248 / 0.5),
      0 0 10px rgb(56 189 248 / 0.3);
  }
  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 8px rgb(56 189 248 / 0),
      0 0 18px rgb(56 189 248 / 0.55);
  }
  100% {
    transform: scale(0.92);
    box-shadow:
      0 0 0 0 rgb(56 189 248 / 0),
      0 0 10px rgb(56 189 248 / 0.22);
  }
}

@keyframes ringPulse {
  0% {
    transform: scale(0.85);
    opacity: 0.65;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

@keyframes dotTravel {
  0% {
    transform: translateX(0) translateY(0) scale(0.45);
    opacity: 0;
  }
  18% {
    opacity: 0.55;
  }
  35% {
    transform: translateX(0.9rem) translateY(-0.22rem) scale(1);
    opacity: 1;
  }
  65% {
    transform: translateX(1.8rem) translateY(0.22rem) scale(0.92);
    opacity: 0.95;
  }
  100% {
    transform: translateX(2.65rem) translateY(0) scale(0.5);
    opacity: 0;
  }
}

@keyframes shellFloat {
  0%,
  100% {
    transform: translateY(0);
    border-color: rgb(71 85 105 / 0.7);
  }
  50% {
    transform: translateY(-1.5px);
    border-color: rgb(56 189 248 / 0.45);
  }
}

@keyframes textPulse {
  0%,
  100% {
    opacity: 0.72;
  }
  50% {
    opacity: 1;
  }
}
</style>
