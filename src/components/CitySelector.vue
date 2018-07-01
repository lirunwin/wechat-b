<template lang="html">
  <div class="row">
    <div class="col-4">
        <div class="pr-1">
          <selector
            :items="province"
            v-model="location.province"
            placeholder="省"
            label="areaName"
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
  watch: {
    'value': {
      deep: true,
      handler(newValue, oldValue) {
        if (!oldValue.province) {
          console.log(JSON.stringify(newValue), JSON.stringify(oldValue));

        }
      },
      // immediate: true
    }
  },
  methods: {
    ...mapActions(['getCities']),
    getCity(pid) {
      this.getCities({
        pid
      })
    },
    getCounty(pid) {
      this.getCities({
        pid
      })
    },
    onProvinceChange(index) {
      if (this.disableCity === null) {
        let id = this.province[index].id;
        this.location.province = id;
        this.location.city = '0';
        this.location.county = '0';
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
        this.location.county = '0';
        this.onChange();
        let county = this.cities.filter(item => item.pid === id);
        if (county.length === 0) {
          this.getCounty(id)
        }
      }
    },
    onCountyChange(index) {
      this.location.county = this.county[index].id;
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
    this.location = Object.assign({}, this.value);
    console.log(19, this.value);
    this.getDefault();
  }
}
</script>
