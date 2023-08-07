<script setup lang="ts"></script>

<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold">Welcome to our SE331 Project 1</h1>
    <p class="my-5">This is our team members</p>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-14">
      <div class="member">
        <img
          src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t39.30808-6/291835562_2105836552922182_2431088402003081743_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE7XMXAG0FUCbMZw5bFCX5QJ9QtBjb3BnEn1C0GNvcGcazfdUJC4J-DS6NbVi_75M8SzkYl82VWthh45Z9mCtcU&_nc_ohc=nM8e7WqPin4AX8HxAye&_nc_oc=AQlLfsHv7xDfmwWnZN_S3TSErwP2gS4yct9PPZrnsCHswSx9sCQGdhCW4BPMSI9Dxvw&_nc_ht=scontent.fcnx4-1.fna&oh=00_AfA5xDgG77l34M2LzjnUycvFWAfa8qX-0bEJOQfFlTD6hg&oe=64D42D52"
          alt=""
          class="h-48 rounded-full mb-4"
        />
        <!-- <h1 class="mt-6 text-2xl font-bold">Ph1r1</h1> -->
        <p><span class="font-bold">Name:</span> Phiriyakorn Maneekongrit</p>
        <p><span class="font-bold">Student Id:</span> 642115031</p>
        <p><span class="font-bold">Position:</span> UX/UI Design</p>
        <a href="https://github.com/ph1r1" target="_blank" class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"
          ><font-awesome-icon :icon="['fab', 'github']" class="mr-2" />Github</a
        >
      </div>
      <div class="member">
        <img
          src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t39.30808-6/275498719_629779414793793_5946041852350644277_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHOOZL-cz-pARJMH3fjgquhLVrADADkC_otWsAMAOQL-thGmLHLabZCNsFgcn2Q7SCYBvCUMXzBRPYsbWLN4dkv&_nc_ohc=hddBK0exEgMAX8khNLW&_nc_ht=scontent.fcnx4-1.fna&oh=00_AfBhPvt1gjS2_AJ5ikL1J5xDxuUEgY8UdW6XDDOWa1s5nQ&oe=64D443C1"
          alt=""
          class="h-48 rounded-full mb-4"
        />
        <p><span class="font-bold">Name:</span> Sorawee Sripakdeepongdej</p>
        <p><span class="font-bold">Student Id:</span> 642115045</p>
        <p><span class="font-bold">Position:</span> ???</p>
        <a href="https://github.com/veevism" target="_blank" class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"
          ><font-awesome-icon :icon="['fab', 'github']" class="mr-2" />Github</a
        >
      </div>
      <div class="member">
        <img
          src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t39.30808-6/354466022_6369832419770902_4081369522415941474_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGt9_5KFqABYhyG-_Z-AyrvC5eEikUYEyILl4SKRRgTIvcNmFgQ1RED7ouIzmv5IKhEOoUseYtg_Z_h71h01uda&_nc_ohc=RzLajNZi_R8AX_swZOA&_nc_ht=scontent.fcnx4-1.fna&oh=00_AfCVM3_VU1BZ8_OUYnMwSxg2N2NWBbLBPiTpS49nwRfi9Q&oe=64D3B642"
          alt=""
          class="h-48 rounded-full mb-4"
        />
        <p><span class="font-bold">Name:</span> Thanapong Yamkamol</p>
        <p><span class="font-bold">Student Id:</span> 642115022</p>
        <p><span class="font-bold">Position:</span> DevOps</p>
        <a href="https://github.com/ThanapongYamkamol642115022" target="_blank" class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"
          ><font-awesome-icon :icon="['fab', 'github']" class="mr-2" />Github</a
        >
      </div>
    </div>
  </main>
</template>
