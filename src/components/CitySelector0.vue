<template lang="html">
  <div class="row">
    <div class="col-4">
        <div class="pr-1">
          <selector
            :items="province"
            v-model="location.province"
            placeholder="省"
            label="areaName"
            returnValue="id"
            @input="onProvinceChange"
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
          returnValue="id"
          @input="onCityChange"
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
          returnValue="id"
          @input="onCountyChange"
          ></selector>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
    defaultLocation: {}
  }),
  computed: {
    ...mapGetters(['cities']),
    province() {
      let province = this.cities.filter(item => +item.pid === 0);
      return province;
    },
    city() {
      let cities = this.cities.filter(item => +item.pid === +this.location.province);
      return cities;
    },
    county() {
      let counties = this.cities.filter(item => +item.pid === +this.location.city);
      return counties;
    }
  },
  watch: {
    province(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (!oldValue.length && newValue.length) {
        this.defaultLocation = Object.assign({}, this.value);
        console.log(1, this.defaultLocation);
        let pid = this.defaultLocation.province;
        let cid = this.defaultLocation.city;
        if (pid) {
          Promise.all([
            this.getCities({ pid }),
            this.getCities({ pid: cid })
          ])
            .then((res) => {
              this.location = this.defaultLocation;
            })
        }
      }
    },
    // city(newValue, oldValue) {
    //   if (!oldValue.length && newValue.length) {
    //     let index = this.city.findIndex(item => +item.id === +this.defaultLocation.city);
    //     this.locationIndex.city = index;
    //   }
    // },
    // county(newValue, oldValue) {
    //   if (!oldValue.length && newValue.length) {
    //     let index = this.county.findIndex(item => +item.id === +this.defaultLocation.county);
    //     this.locationIndex.county = index;
    //   }
    // }
  },
  methods: {
    ...mapActions(['getCities']),
    getCity(pid) {
      this.getCities({ pid });
    },
    getCounty(pid) {
      this.getCities({ pid });
    },
    onProvinceChange(id) {
      this.location.province = id;
      this.location.city = -1;
      this.location.county = -1;
      this.onChange();
      let city = this.cities.filter(item => item.pid === id);
      if (city.length === 0) {
        this.getCity(id);
      }
    },
    onCityChange(id) {
      console.log(id);
      let location = Object.assign({}, this.location);
      location.city = id;
      location.county = -1;
      this.location = location;
      this.onChange();
      let county = this.cities.filter(item => item.pid === id);
      if (county.length === 0) {
        this.getCounty(id)
      }
    },
    onCountyChange(id) {
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
