<template>
  <main :class="['content', {'preloader': this.$store.state.preloader}]">
    <transition name="fade">
      <span class="preloader-circle" v-if="this.$store.state.preloader"><span></span></span>
    </transition>
    <transition name="fade">
      <div class="contact-us" v-if="!this.$store.state.preloader && this.$store.state.contactsInfo.length !== 0">
        <div class="container">
          <h1>Contact Us</h1>
          <div class="info-area">
            <figure v-if="stateInfo['location']">
              <Map :latitude="+stateInfo['location']['lat']" :longitude="+stateInfo['location']['lng']" image="marker.png"></Map>
            </figure>
            <div class="description">
              <p>{{stateInfo['addressText']}}</p>
              <address>
                <span v-for="(text, index) in stateInfo['address']" :key="index">{{text[Object.keys(text)]}}</span>
              </address>
              <dl class="contacts-list">
                <dt>Call:</dt>
                <dd><a :href="`tel:${stateInfo['phone'].split(' ').join('')}`">{{stateInfo['phone']}}</a></dd>
                <dt>Fax:</dt>
                <dd><a :href="`tel:${stateInfo['fax'].split(' ').join('')}`">{{stateInfo['fax']}}</a></dd>
              </dl>
            </div>
          </div>
          <!--/info-area-->
          <div class="contacts-area">
            <div class="row">
              <div class="lap-6">
                <div class="info">
                  <p>{{stateInfo['formText']}}</p>
                  <a :href="`mailto:${stateInfo['email']}`" class="link">{{stateInfo['email']}}</a>
                </div>
              </div>
              <div class="lap-6">
                <div class="contacts-form">
                  <form @submit="onSubmit" @keydown="form.errors.clear($event.target.name)" class="submitForm">
                    <div class="row">
                      <div class="desk-6">
                        <div class="form-group">
                          <input :class="['form-control', {'error': form.errors.has('firstName')}]" placeholder="Your Name *" type="text" name="firstName" v-model="form.firstName[1]">
                        </div>
                        <span v-if="form.errors.has('firstName')" v-text="form.errors.get('firstName')"></span>
                      </div>
                      <div class="desk-6">
                        <div class="form-group">
                          <input :class="['form-control', {'error': form.errors.has('lastName')}]" placeholder="Your Last Name *" type="text" name="lastName" v-model="form.lastName[1]">
                        </div>
                        <span v-if="form.errors.has('lastName')" v-text="form.errors.get('lastName')"></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="desk-6">
                        <div class="form-group">
                          <input :class="['form-control', {'error': form.errors.has('email')}]" placeholder="Email *" type="text" name="email" v-model="form.email[1]">
                        </div>
                        <span v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
                      </div>
                      <div class="desk-6">
                        <div class="form-group">
                          <input class="form-control" placeholder="Phone" type="text">
                        </div>
                      </div>
                    </div>
                    <div class="form-group textarea">
                      <textarea :class="['form-control', {'error': form.errors.has('message')}]" placeholder="Enter Message *" name="message" v-model="form.message[1]"></textarea>
                      <span v-if="form.errors.has('message')" v-text="form.errors.get('message')"></span>
                    </div>
                    <div class="form-footer">
                      <span class="note">* Indicates required field.</span>
                      <button type="submit" class="btn">Send</button>
                    </div>
                  </form>
                </div>
                <!--/contacts-form-->
              </div>
            </div>
          </div>
          <!--/contacts-area-->
        </div>
      </div>
      <!--/contact-us-->
    </transition>
  </main>
</template>

<script>
  import {Form, Errors} from "~/plugins/includes/validation";
  import Map from '~/components/Map.vue';


  export default {
    components: {
      Map
    },
    data() {
      return {
        form: new Form({
          firstName: ['First name', ''],
          lastName: ['Last name', ''],
          message: ['Message', ''],
          email: ['Email', '']
        })
      }
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
