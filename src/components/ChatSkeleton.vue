<template>
  <div class="space-y-10">
    <div
      v-for="n in props.skeletonCount"
      :key="n"
      class="skeleton-flex-container"
      :class="{ reverse: n % 2 === 0 }"
    >
      <div class="custom skeleton-shimmer"></div>
      <div class="custom-flex-container" :class="{ end: n % 2 === 0 }">
        <div class="custom-flicker flicker "></div>
        <div class="custom-container" :class="{ end: n % 2 === 0 }">
          <div v-for="i in n" :key="i" class="item flicker"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skeletonCount: {
    type: Number,
    default: 3,
  },
})
</script>

<style scoped>
.space-y-10 > * + * {
  margin-top: 2.5rem;
}

.skeleton-flex-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.custom {
  width: 3.5rem; 
  height: 3.5rem;
  border-radius: 50%; 
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
 
}

.custom-flex-container {
  /* flex-1 */
  flex: 1 1 0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
}

.custom-flex-container > * + * {
  margin-top: 0.5rem;
}

.custom-flicker {
  width: 25%;
  height: 1.5rem;
  border-radius: 0.25rem;
}

.custom-container {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.custom-container > * + * {
    
    margin-top: 0.25rem;
}

.item {
 
  width: 66.666667%; 
  height: 1.5rem; 
  border-radius: 0.25rem; 
}
@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

.reverse {
  flex-direction: row-reverse;
}

.end {
  align-items: end;
}

.skeleton-shimmer {
  background: linear-gradient(90deg, rgba(var(--text-color), 0.1), rgba(var(--text-color), 0.2));
}

.flicker {
  background: linear-gradient(
    90deg,
    rgba(var(--text-color), 0.1) 25%,
    rgba(var(--text-color), 0.2) 37%,
    rgba(var(--text-color), 0.1) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.5s infinite;
}
</style>
