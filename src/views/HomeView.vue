<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-center">Welcome to our SE331 Project 1</h1>
    <p class="my-5">This is our team members</p>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-14 max-[1111px]:gap-16">
      <div class="member">
        <img src="https://i.imgur.com/tbXDnsJ.jpg" alt="" class="h-48 rounded-full mb-4" />
        <!-- <h1 class="mt-6 text-2xl font-bold">Ph1r1</h1> -->
        <p><span class="font-bold">Name:</span> Phiriyakorn Maneekongrit</p>
        <p><span class="font-bold">Student Id:</span> 642115031</p>
        <p><span class="font-bold">Position:</span> UX/UI Design</p>
        <a href="https://github.com/ph1r1" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a>
      </div>
      <div class="member">
        <img src="https://i.imgur.com/0OP6iW0.jpg" alt="" class="h-48 rounded-full mb-4" />
        <p><span class="font-bold">Name:</span> Sorawee Sripakdeepongdej</p>
        <p><span class="font-bold">Student Id:</span> 642115045</p>
        <p><span class="font-bold">Position:</span> Oldest Dream</p>
        <a href="https://github.com/veevism" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a>
      </div>
      <div class="member">
        <img src="https://i.imgur.com/ZFR8aEk.jpg" alt="" class="object-cover h-48 rounded-full mb-4" />
        <p><span class="font-bold">Name:</span> Ratchapon</p>
        <p><span class="font-bold">Student Id:</span> 642115040</p>
        <p><span class="font-bold">Position:</span> Hokage</p>
        <a href="https://github.com/LodHoiZ" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a>
      </div>
    </div>
  </main>
</template>
