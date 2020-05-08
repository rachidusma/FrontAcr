<template>
 <v-app>
  <Carousel />
  <SectionOne />
  <Timeline />
  <SectionTwo />
  <SectionFive />
  <SectionThree />
  <SectionFour />
 </v-app>
</template>

<script> 
import Carousel from '@/components/Carousel';
import SectionOne from '@/components/SectionOne';
import SectionTwo from '@/components/SectionTwo';
import SectionThree from '@/components/SectionThree';
import SectionFour from '@/components/SectionFour';
import SectionFive from '@/components/SectionFive';
import Timeline from '@/components/Timeline';
export default {
  components: {
    Carousel,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    SectionFive,
    Timeline
  }
}
</script>
<style scoped>

</style>
