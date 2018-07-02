<template lang="html">
  <div class="row" v-if="value.province !== undefined">
    <div class="col-4">
        <div class="pr-1">
          <selector
            :items="province"
            v-model="location.province"
            placeholder="省"
            label="areaName"
            @input="onProvinceChange"
            :defaultIndex="locationIndex.province"
          ></selector>
        </div>
    </div>
    <div class="col-4" v-if="disableCity === null">
      <div>
        <selector
          :items="city"
          v-model="location.city"
          placeholder="市"
          label="areaName"
          @input="onCityChange"
          :defaultIndex="locationIndex.city"
        ></selector>
      </div>
    </div>
    <div class="col-4" v-if="disableCity === null && disableCounty === null">
      <div class="pl-1">
        <selector
          :items="county"
          v-model="location.county"
          placeholder="区县"
          label="areaName"
          @input="onCountyChange"
          :defaultIndex="locationIndex.county"
          ></selector>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import Selector from '@/components/Selector';
export default {
  name: 'CitySelector',
  components: {
    Selector
  },
  props: {
    value: {
      type: Object,
      default: null
    },
    disableCity: {
      type: [String, Boolean],
      default: null
    },
    disableCounty: {
      type: [String, Boolean],
      default: null
    }
  },
  data: () => ({
    items: [],
    location: {},
    locationIndex: {
      province: -1,
      city: -1,
      county: -1
    },
    defaultLocation: {}
  }),
  computed: {
    ...mapGetters(['cities']),
    province() {
      let provincee = this.cities.filter(item => item.pid === '0');
      return provincee
    },
    city() {
      let cities = this.cities.filter(item => item.pid === this.location.province);
      return cities;
    },
    county() {
      let counties = this.cities.filter(item => item.pid === this.location.city);
      return counties;
    }
  },
  watch: {
    province(newValue, oldValue) {
      if (!oldValue.length && newValue.length) {
        this.location = Object.assign({}, this.value);
        this.defaultLocation = Object.assign({}, this.value);
        this.locationIndex.province = this.province.findIndex(item => +item.id === +this.defaultLocation.province);
        this.getCities({ pid: this.location.province });
        this.getCities({ pid: this.location.city });
      }
    },
    city(newValue, oldValue) {
      if (!oldValue.length && newValue.length) {
        let index = this.city.findIndex(item => +item.id === +this.defaultLocation.city);
        this.locationIndex.city = index;
      }
    },
    county(newValue, oldValue) {
      if (!oldValue.length && newValue.length) {
        let index = this.county.findIndex(item => +item.id === +this.defaultLocation.county);
        this.locationIndex.county = index;
      }
    }
  },
  methods: {
    ...mapActions(['getCities']),
    getCity(pid) {
      this.getCities({ pid });
    },
    getCounty(pid) {
      this.getCities({ pid });
    },
    onProvinceChange(index) {
      if (this.disableCity === null) {
        let id = this.province[index].id;
        this.location.province = id;
        this.location.city = 0;
        // this.locationIndex.city = 0;
        this.location.county = 0;
        // this.locationIndex.county = 0;
        this.onChange();
        let city = this.cities.filter(item => item.pid === id);
        if (city.length === 0) {
          this.getCity(id);
        }
      }
    },
    onCityChange(index) {
      if (this.disableCounty === null) {
        let id = this.city[index].id;
        this.location.city = id;
        this.location.county = 0;
        // this.locationIndex.county = 0;
        this.onChange();
        let county = this.cities.filter(item => item.pid === id);
        if (county.length === 0) {
          this.getCounty(id)
        }
      }
    },
    onCountyChange(index) {
      let id = this.county[index].id
      this.location.county = id;
      this.onChange();
    },
    onChange() {
      if (this.disableCity !== null) {
        delete this.location.city
      }
      if (this.disableCounty !== null) {
        delete this.location.county
      }
      this.$emit('input', this.location);
    },
    getDefault() {
      let defaultLocation = this.value;
      if (defaultLocation && defaultLocation.province > 0) {
        this.getCities({
          pid: "0"
        });
        this.getCities({
          pid: defaultLocation.province
        });
        this.getCities({
          pid: defaultLocation.city
        });
      } else {
        this.getCities({
          pid: "0"
        });
      }
    }
  },
  mounted() {
    this.getDefault();
    // this.location = Object.assign({}, this.value);
    // console.log(19, this.value);
  }
}
</script>
