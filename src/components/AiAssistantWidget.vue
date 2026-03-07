<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import ThinkingIndicator from './ThinkingIndicator.vue';

type Role = 'user' | 'assistant';

interface Message {
  id: number;
  role: Role;
  text: string;
}

const AVERAGE_THINKING_MS = 3500;
const THINKING_VARIATION_MS = 500;

const panelOpen = ref(false);
const draft = ref('');
const thinking = ref(false);
const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    text: "Hi! I'm a demo AI assistant. Ask me about pricing, timeline, or delivery formats.",
  },
]);

const messageContainer = ref<HTMLElement | null>(null);

let replyTimeoutId: ReturnType<typeof setTimeout> | null = null;
let nextMessageId = 2;

function openPanel() {
  panelOpen.value = true;
  nextTick(scrollToBottom);
}

function closePanel() {
  panelOpen.value = false;
}

function getThinkingDelay(): number {
  const min = Math.max(0, AVERAGE_THINKING_MS - THINKING_VARIATION_MS);
  const max = AVERAGE_THINKING_MS + THINKING_VARIATION_MS;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMessage() {
  const text = draft.value.trim();
  if (!text || thinking.value) return;

  messages.value.push({
    id: nextMessageId++,
    role: 'user',
    text,
  });

  draft.value = '';
  thinking.value = true;

  const delay = getThinkingDelay();
  replyTimeoutId = setTimeout(() => {
    thinking.value = false;

    messages.value.push({
      id: nextMessageId++,
      role: 'assistant',
      text: getAssistantReply(text),
    });

    replyTimeoutId = null;
  }, delay);
}

function getAssistantReply(input: string): string {
  // Replace this with an API call later, e.g. fetch('/api/chat', { method: 'POST', body: ... }).
  return fakeReply(input);
}

function fakeReply(input: string): string {
  const normalized = input.toLowerCase();

  if (/\b(pricing|price|cost|budget)\b/.test(normalized)) {
    return 'Demo mode: pricing usually depends on scope, number of edits, and delivery channels. Share your goals and we can suggest a sample range.';
  }

  if (/\b(timeline|delivery|deliver|how long|turnaround)\b/.test(normalized)) {
    return 'Demo mode: a typical project timeline can range from 1-4 weeks depending on pre-production, filming days, and revision rounds.';
  }

  if (/\b(formats|format|tiktok|reels|youtube|shorts)\b/.test(normalized)) {
    return 'Demo mode: yes, we can adapt deliverables for TikTok, Reels, YouTube, and Shorts with platform-specific aspect ratios and cutdowns.';
  }

  return 'Thanks! Demo mode for now - once backend is connected, I can answer with live project-specific details.';
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}

function scrollToBottom() {
  if (!messageContainer.value) return;
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
}

watch(
  [messages, thinking, panelOpen],
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (replyTimeoutId) {
    clearTimeout(replyTimeoutId);
  }
});
</script>

<template>
  <div class="mt-8 text-center">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-gradient-to-r from-primary via-grad-via to-grad-to px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 focus:outline-none focus:ring-2 focus:ring-primary/40"
      @click="openPanel"
    >
      Ask our AI Assistant
    </button>
  </div>

  <div
    v-if="panelOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]"
    @click="closePanel"
    aria-hidden="true"
  />

  <aside
    class="fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-md flex-col border-l border-outline bg-surface px-4 pb-4 pt-4 shadow-2xl transition-transform duration-200 sm:px-5"
    :class="panelOpen ? 'translate-x-0' : 'translate-x-full'"
    role="dialog"
    aria-modal="true"
    aria-label="AI Assistant chat panel"
  >
    <header class="mb-4 flex items-center justify-between border-b border-outline/80 pb-3">
      <h3 class="text-base font-semibold text-on-surface-heading">AI Assistant</h3>
      <button
        type="button"
        class="rounded-md border border-outline px-2.5 py-1.5 text-xs font-medium text-on-surface-muted transition hover:border-primary/50 hover:text-primary"
        @click="closePanel"
      >
        Close
      </button>
    </header>

    <div
      ref="messageContainer"
      class="flex-1 space-y-3 overflow-y-auto pr-1"
      aria-live="polite"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <p
          class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
          :class="
            message.role === 'user'
              ? 'bg-primary text-white'
              : 'border border-outline bg-surface-card text-on-surface-muted'
          "
        >
          {{ message.text }}
        </p>
      </div>

      <div v-if="thinking" class="flex justify-start">
        <ThinkingIndicator />
      </div>
    </div>

    <div class="mt-4 border-t border-outline/80 pt-3">
      <div class="flex items-center gap-2">
        <input
          v-model="draft"
          type="text"
          placeholder="Ask about pricing, timeline, formats..."
          class="h-11 flex-1 rounded-xl border border-outline bg-surface-card px-3 text-sm text-on-surface-heading outline-none ring-0 placeholder:text-on-surface-muted/80 focus:border-primary/50"
          @keydown="onInputKeydown"
        />
        <button
          type="button"
          class="h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="thinking || !draft.trim()"
          @click="sendMessage"
        >
          Send
        </button>
      </div>
    </div>
  </aside>
</template>
