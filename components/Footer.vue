<template>

  <footer class="footer_" v-if="stateInfo.length !== 0">
    <div class="container">
      <div class="row">
        <div class="desk-4">
          <address>
            <span v-for="(text, index) in stateInfo['address']" :key="index">{{text[Object.keys(text)]}}</span>
          </address>
          <h5><a href="https://www.google.com.mx/maps/place/Fundaci%C3%B3n+Espinosa+Rugarcia/@19.3588865,-99.1934782,17z/data=!4m13!1m7!3m6!1s0x85d2001f92ce07ad:0x8dae53292bb8ca8d!2sAv.+Las+Flores+50,+Campestre,+01040+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.3588815!4d-99.1912895!3m4!1s0x85d2001f926c853f:0x5d59993b9b4901b0!8m2!3d19.3589056!4d-99.191312">Get Directions</a></h5>
          <ul class="social">
            <li><a href="https://www.facebook.com/fundacion.amma/" class="icon-facebook" target="_blank"></a></li>
            <li><a href="https://twitter.com/fundacionamma?lang=es" class="icon-twitter" target="_blank"></a></li>
            <li><a href="https://www.instagram.com/fundacion_amma/" class="icon-youtube" target="_blank"></a></li>
            <li><a href="#" class="icon-rss" target="_blank"></a></li>
          </ul>
          <!--/social-->
        </div>
        <div class="desk-4">
          <dl class="contacts-list">
            <dt>Call:</dt>
            <dd>{{stateInfo['phone']}}</dd>
            <dt>Fax:</dt>
            <dd>{{stateInfo['fax']}}</dd>
            <dt>Email:</dt>
            <dd><a :href="`mailto:${stateInfo['email']}`">{{stateInfo['email']}}</a></dd>
          </dl>
          <h5><nuxt-link to="/news">Art News</nuxt-link></h5>
        </div>
        <div class="desk-4">
          <div class="subscribe">
            <p>Stay updated</p>
            <p>Receive news about The Fundación AMMA collection, exhibitions, events, and more.</p>
            <form @submit="onSubmit" @keydown="form.errors.clear($event.target.name)">
              <div class="subscribe-form">
                <div class="form-group">
                  <input :class="['form-control', {'error': form.errors.has('email')}]" placeholder="Enter Your Email *" type="text" name="email" v-model="form.email[1]">
                  <span v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
          <!--/subscribe-->
        </div>
      </div>
      <p class="copy">&copy; 2017 Fundación AMMA. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
  import {Form, Errors} from "~/plugins/includes/validation";

  export default {
    data() {
      return {
        form: new Form({
          email: ['Email', '']
        })
      }
    },
    beforeMount() {
      this.$store.state.preloader = true;
    },
    mounted() {
      this.$store.dispatch('getContactsInfo').then(() => {
        this.$store.state.preloader = false;
      });
    },
    computed: {
      stateInfo() {
        return this.$store.state.contactsInfo
      }
    },
    methods: {
      onSubmit(e) {
        this.form.record();
        if (Object.keys(this.form.errors['errors']).length > 0) e.preventDefault();
        // this.form.reset();
      }
    }
  }
</script>
