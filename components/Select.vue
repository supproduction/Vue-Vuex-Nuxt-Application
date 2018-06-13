<template>
  <select :value="value" @change="onChange($event.target.value)">
    <option v-for="(option, key, index) in options" :key="index" :value="key" :selected="key === value">{{option}}</option>
  </select>
</template>

<script>
  let jcf;
  if (process.browser) {
    jcf = require('jcf');
  }

  export default {
    props: ['options', 'value'],
    methods: {
      onChange(value) {
        this.$emit('input', value);
      }
    },
    mounted: function() {
      jcf.setOptions('Select', {
        wrapNative: true,
        useCustomScroll: true,
        wrapNativeOnMobile: true,
        fakeDropInBody: false
      });
      jcf.replace(this.$el);
    },
    updated() {
      if (!!!this.$el.parentElement.querySelector('.jcf-select-text').textContent) {
        jcf.refresh(this.$el);
      }
    }
  }
</script>
