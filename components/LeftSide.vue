<template>
    <v-col
          cols="12"
          md="7"
          sm="12"
        >
         <v-row
            dark
            class="fill-height img-bg"
            align="center"
            justify="center"
          >
         <v-row
            dark
            class="fill-height bg-overlay"
            align="center"
            justify="center"
          >
          <v-row
            dark
            class="min"
            align="center"
            justify="center"
          >
            <v-container>
            </v-container>
          </v-row>
        </v-row>
         </v-row>

         <div class="opacity-1">
                <h1 class="font1 white--text bold text-uppercase" align="center"> Quick, safe and easy </h1>
                <p align="center" class="font2 white--text  mt-9"><v-icon class="font1 white--text mr-9">mdi-file-multiple-outline</v-icon> Your invoice and Get paid right now</p>
                <p align="center" class="font2 white--text  mt-9"><v-icon class="font1 white--text mr-9">mdi-account-arrow-left-outline</v-icon>Create Your invoice and Get paid right now</p>
                <p align="center" class="font2 white--text  mt-9"><v-icon class="font1 white--text mr-9">mdi-bike-fast</v-icon>Create Your invoice and Get paid right now</p>
                <p align="center" class="font2 white--text  mt-9"><v-icon class="font1 white--text mr-9">mdi-bike-fast</v-icon>Create Your invoice and Get paid right now</p>
          </div>
         
        </v-col>
</template>
<style scoped>
 .opacity-1{
    position:absolute;
    top: 150px;
    z-index: 99;
    margin: auto;
    width: 60%;
  }
  @media only screen and (max-width: 960px) {
   .opacity-1 {
      width: 100%;
    }
    .opacity-1 p{
      display : none
    }
    .min{
      height:200px !important ;
    }
  }
  @media only screen and (min-width: 960px) {
.min{
  min-height:600px ;
 }
  }
 .img-bg{
  background-image: url("https://d36fgo9tveb5fn.cloudfront.net/wp-content/uploads/2019/08/23141524/ff_photographer_25.jpg");
  background-size: cover;
  background-position: 50%;
  margin-right: 0px !important;
  position: relative;
}
.img-bg >.bg-overlay ::after{
    content: "";
    position: absolute;
    display: inline-block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,88,124,0.5);
    z-index: 8;
}
.font1
{
  font-size: 35px;
}
.font2
{
  font-size: 22px;
}
</style>