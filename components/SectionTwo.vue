<template>
  <v-row no-gutters>
    <v-col cols="12" lg="5" xs="12">
      <v-card
        class="pa-8"
        tile
        min-height="550px"
        style="background-image :url(https://coolcompany.com/uk/wp-content/uploads/sites/3/2018/10/young-man-laughing-near-bearded-colleague-1080x720.jpg)"
      ></v-card>
    </v-col>
    <v-col cols="12" lg="7" xs="12">
      <v-card class="pa-8" tile min-height="550px" color="#336882">
        <v-row align="center">
          <v-item-group v-model="window" class="shrink mr-6" mandatory tag="v-flex">
            <v-item v-for="n in length" :key="n" v-slot:default="{ active, toggle }">
              <div>
                <v-btn :input-value="active" icon @click="toggle">
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>

          <v-col>
            <v-window v-model="window" class="elevation-1" vertical>
              <v-window-item v-for="n in length" :key="n">
                <v-card flat>
                  <v-card-text>
                    <v-row class="mb-4" align="center">
                      <strong class="title">Title</strong>
                      <v-spacer></v-spacer>
                    </v-row>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    length: 3,
    window: 0
  })
};
</script>
<style scoped>
</style>