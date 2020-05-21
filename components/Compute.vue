<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <h3 class="main">Calculate the net salary</h3>
        <p>With our salary calculator you can easily calculate your salary after tax (net salary).</p>
        <v-text-field
          label="Salary"
          v-model="salary"
          placeholder="Monthly salary gross"
          outlined
          color="#336882"
          dense
          type="number"
        ></v-text-field>

        <v-select
          v-model="val"
          :items="items"
          item-text="region"
          item-value="rate"
          label="Region"
          outlined
          dense
          color="#336882"
        ></v-select>
        <h3 class="main">Your net salary</h3>
        <p>
          you get to keep
          <span class="main">{{Math.round((salary - (salary * val /100)-(salary *5/100))*100)/100}}</span>
          SEK out of {{salary}} SEK in salary after tax ,
          your employer also pays an employer contribution of SEK 1,082,701,119. Of your salary, 65% goes to the state in the form of taxes and fees. In addition to this,
          many employers also set aside some percent of their salary for occupational pensions, as well as any insurance.
        </p>
      </v-col>
      <v-col cols="12" md="6" sm="12"></v-col>
    </v-row>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    val: 0,
    salary: 0,
    items: [
      { region: "ALE", rate: 33.35 },
      { region: " Alingsås", rate: 32.35 },
      { region: " Aling", rate: 31.35 },
      { region: " Alisås", rate: 30.35 },
      { region: " Alinsås", rate: 3.35 }
    ]
  })
};
</script>