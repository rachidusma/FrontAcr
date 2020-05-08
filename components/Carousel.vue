<template>
    <v-carousel
   hide-delimiter-background
   dark
   hide-delimiters
   height="700px"
   :show-arrows="false"
   class="carousel"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
      >
       <v-row
            dark
            class="fill-height bg-overlay"
            align="center"
            justify="center"
          >
            <v-container
            >
            <div class="opacity-1">
                <h1 class="display-4 white--text bold text-uppercase opacity-1" align="center"> {{ item.txt }} </h1>
                <p align="center" class="display-1 white--text bold text-uppercase">Create Your invoice and Get paid right now</p>
            </div>
            </v-container>
        </v-row>
        
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
    data () {
      return {
        items: [
          {
            src: 'https://i.ytimg.com/vi/FgxJ1etZHGo/maxresdefault.jpg',
            txt: 'acredit'
          },
          {
            src: 'https://i.ytimg.com/vi/FgxJ1etZHGo/maxresdefault.jpg',
            txt: 'acredit'
          },
        ],
      }
    },
}
</script>
<style  scoped>
.bg-overlay{
  background-color: #333;
  opacity: .5;
}
.opacity-1{
    opacity: 1;
    z-index: 100;
}
</style>