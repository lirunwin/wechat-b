<template lang="html">
  <div fluid grid-list-lg class="py-0">
    <div  wrap class="py-0 row">
      <div class="col-3 text-truncate">
        <selector
          :items="province"
          v-model="location.province"
          placeholder="省"
          hide-details
          @input="onProvinceChange"
        ></selector>
      </div>
      <div class="col-3 text-truncate" v-if="disableCity === undefined">
        <selector
          :items="city"
          v-model="location.city"
          placeholder="市"
          item-text="areaname"
          @input="onCityChange"
        ></selector>
      </div>
      <div class="col-3 text-truncate" v-if="disableCity === undefined && disableCounty === undefined">
        <selector
          :items="county"
          v-model="location.county"
          placeholder="区县"
          item-text="areaname"
          @input="onCountyChange"
          ></selector>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'CitySelector',
  props: ['value', 'disableCity', 'disableCounty'],
  data: () => ({
    items: [],
    location: {}
  }),
  computed: {
    ...mapGetters(['cities']),
    province() {
      return this.cities.filter(item => item.pid === '0');
    },
    city() {
      return this.cities.filter(item => item.pid === this.location.province);
    },
    county() {
      return this.cities.filter(item => item.pid === this.location.city);
    }
  },
  methods: {
    ...mapActions(['getCities']),
    getCity(id) {
      if (!this.isCityLoading) {
        this.isCityLoading = true;
        this.getCities({ id })
          .then(() => this.isCityLoading = false);
      }
    },
    getCounty(id) {
      if (!this.isCountyLoading) {
        this.isCountyLoading = true;
        this.getCities({ id })
          .then(() => this.isCountyLoading = false);
      }
    },
    onProvinceChange(id) {
      if (this.disableCity === undefined) {
        this.onChange();
        this.location.city = '0';
        this.location.county = '0';
        let city = this.cities.filter(item => item.pid === id);
        if (city.length === 0) {
          this.getCity(id)
        }
      }
    },
    onCityChange(id) {
      this.onChange();
      if (this.disableCounty === undefined) {
        this.location.county = '0';
        let county = this.cities.filter(item => item.pid === id);
        if (county.length === 0) {
          this.getCounty(id)
        }
      }
    },
    onCountyChange() {
      this.onChange();
    },
    onChange() {
      if (this.disableCity !== undefined) {
        delete this.location.city
      }
      if (this.disableCounty !== undefined) {
        delete this.location.county
      }
      this.$emit('input', this.location);
    },
    getDefault() {
      let defaultLocation = this.value;
      if (defaultLocation.province > 0) {
        this.getCities({
          id: "0"
        });
        this.getCities({
          id: defaultLocation.province
        });
        this.getCities({
          id: defaultLocation.city
        });
      } else {
        this.getCities({
          id: "0"
        });
      }
    }
  },
  mounted() {
    this.location = Object.assign({}, this.value);
    this.getDefault();
  }
}
</script>
