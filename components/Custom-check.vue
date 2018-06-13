<template>
  <label>
    <input type="checkbox" @change="onChange()" class="js-check" :checked="state">
    <slot></slot>
  </label>
</template>

<script>
  let jcf;
  if (process.browser) {
    jcf = require('jcf');
  }

  export default {
    data() {
      return {
        state: false
      }
    },
    props:['checked','value'],
    model: {
      prop: 'checked',
      event: 'input'
    },
    methods: {
      onChange() {
        if (Array.isArray(this.checked)) {
          if (this.checked.includes(this.value)) {
            this.checked.splice(this.checked.indexOf(this.value), 1);
            this.state = false;
          } else {
            this.checked.push(this.value);
            this.state = true;
          }
        } else {
          this.state = !this.state;
          this.$emit('input', this.state);
        }
      }
    },
    mounted: function() {
      if (Array.isArray(this.checked)) {
        for (let item in this.checked) {
          if (this.value == this.checked[item]) {
            this.state = true;
          }
        }
      } else {
        this.state = this.checked;
      }

      this.$nextTick(() => {
        jcf.replace(this.$el.querySelector('.js-check'));
      })
    }
  }
</script>
