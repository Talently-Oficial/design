<template>
  <div class="relative flex flex-col items-center md:flex-row">
    <div class="border rounded-lg size-14 flex items-center justify-center relative">
      <div class="w-8/12 h-[60%] flex flex-col gap-1">
        <div class="h-0.5 w-full bg-neutral-300"></div>
        <div class="h-0.5 w-11/12 bg-neutral-300"></div>
        <div class="h-0.5 w-full bg-neutral-300"></div>
        <div class="h-0.5 w-full bg-neutral-300"></div>
        <div class="h-0.5 w-full bg-neutral-300"></div>
        <div class="h-0.5 w-8/12 bg-neutral-300"></div>
      </div>

      <div class="scan bg-primary-500"></div>
    </div>

    <div class="border-progress opacity-50"></div>

    <div class="relative">
      <div class="rounded-lg size-20 flex items-center justify-center p-0.5">
        <div class="bg-neutral-700 rounded-lg w-full h-full text-3xl text-white font-medium flex items-center justify-center">
          AI
        </div>
      </div>

      <div>
        <div class="absolute -top-1 h-2 w-full flex justify-around">
          <div></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div></div>
        </div>

        <div class="absolute top-0 -right-1 w-2 h-full flex justify-around flex-col">
          <div></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div></div>
        </div>

        <div class="absolute -bottom-1 h-2 w-full flex justify-around">
          <div></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div class="w-0.5 h-full bg-neutral-700"></div>
          <div></div>
        </div>

        <div class="absolute top-0 -left-1 w-2 h-full flex justify-around flex-col">
          <div></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div class="w-full h-0.5 bg-neutral-700"></div>
          <div></div>
        </div>
      </div>

      <img src="https://d1hazhe1glojgw.cloudfront.net/bg-7_1720992427971.png" class="magic-dust scale-80 absolute inset-0" alt="bg ai">

      <div class="stars-ai absolute inset-0">
        <img src="https://d1hazhe1glojgw.cloudfront.net/star_1721066899044.svg" alt="star ai">
        <img src="https://d1hazhe1glojgw.cloudfront.net/star_1721066899044.svg" alt="star ai">
        <img src="https://d1hazhe1glojgw.cloudfront.net/star_1721066899044.svg" alt="star ai">
      </div>
    </div>

    <div class="border-progress opacity-50"></div>

    <div class="w-14 -space-y-5">
      <img src="https://d1hazhe1glojgw.cloudfront.net/pila_1_1721137299108.svg" alt="server" class="relative z-20">
      <img src="https://d1hazhe1glojgw.cloudfront.net/pila_1_1721137299108.svg" alt="server" class="relative z-10">
      <img src="https://d1hazhe1glojgw.cloudfront.net/pila_1_1721137299108.svg" alt="server" class="relative z-0">
    </div>
  </div>
</template>

<style scoped>
.scan {
  position: absolute;
  width: calc(100% + 6px);
  height: 2px;
  animation: scanAnimation 1.5s alternate infinite;
  box-shadow: 0 0 15px 1px rgb(152 84 241);
}

@keyframes scanAnimation {
  0% {
    top: 5%;
  }
  100% {
    top: 95%;
  }
}

.magic-dust {
  animation: magicDustAnimation 2s linear infinite;
}

@keyframes magicDustAnimation {
  0% {
    opacity: 0.1;
    transform: rotate(0deg)
  }
  50% {
    opacity: 0.4;
    transform: rotate(180deg)
  }
  100% {
    opacity: 0.1;
    transform: rotate(360deg)
  }
}

.border-progress {
  background: linear-gradient(90deg, black 50%, transparent 50%), linear-gradient(90deg, black 50%, transparent 50%), linear-gradient(0deg, black 50%, transparent 50%), linear-gradient(0deg, black 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 4px, 15px 4px, 4px 15px, 4px 15px;
  background-position: 0 0, 200px 100px, 0px 100px, 200px 0px;
  animation: borderProgress 4s infinite linear;
  width: 2px;
  height: 50px;

  @media (min-width: 768px) {
    height: 2px;
    width: 100px;
    transform: rotate(180deg);
  }
}

@keyframes borderProgress {
  0% {
    background-position: 300px 0, 0 116px, 0 0, 216px 150px;
  }
  100% {
    background-position: 0 0, 300px 116px, 0 150px, 216px 0;
  }
}

.stars-ai img {
  position: absolute;
  animation: starAnimation 2s linear infinite;
  height: auto;

  &:nth-child(1) {
    top: 20%;
    left: 57%;
    width: 12%;
    animation-delay: 0.5s;
  }

  &:nth-child(2) {
    top: 39%;
    left: 14%;
    width: 13%;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    top: 68%;
    left: 67%;
    width: 20%;
    animation-delay: 1.5s;
  }
}

@keyframes starAnimation {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
</script>
