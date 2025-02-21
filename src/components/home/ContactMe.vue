<template>
  <div class="container" :class="{ 'mt-5': !isFooter }" id="contact">
    <h1 v-if="!isFooter">Contact Us</h1>
    <p class="mb-5" v-if="!isFooter">
      If you have any questions or would like to place an order, please don't
      hesitate to contact me.
    </p>
    <div class="row mb-3">
      <div
        class="contact"
        :class="fullWidth ? 'col-12' : 'col-md-4'"
        v-if="showContact"
      >
        <h5>Contact Us</h5>
        <ul class="list-unstyled text-muted">
          <li>Voller St,</li>
          <li>Ropes Crossing NSW 2760</li>
          <li>Phone: 0420 450 149</li>
          <li>Email: warsievgeniya@gmail.com</li>
        </ul>
      </div>
      <div class="opening col-md-4 mb-3" v-if="showHours">
        <h5>Opening Hours</h5>
        <ul class="list-unstyled text-muted">
          <li>Saturday - Thursday: 7:00 AM - 7:00 PM</li>
          <li>Friday: 7:00 AM - 10:00 PM</li>
        </ul>
      </div>
      <div class="location col-md-4 mb-3" v-if="showLocation">
        <h5>Location</h5>
        <!-- for future map -->
        <!-- <img src="@/assets/images/map.png" alt="Map" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactMe',
  props: {
    showContact: {
      type: Boolean,
      default: true
    },
    showHours: {
      type: Boolean,
      default: true
    },
    showLocation: {
      type: Boolean,
      default: true
    },
    isFooter: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>
