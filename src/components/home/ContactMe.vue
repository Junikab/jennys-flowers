<template>
  <div class="container-fluid p-0 mt-3" id="contact">
    <div class="row justify-content-center">
      <div class="images-container vw-100 p-0 m-0">
        <div class="row g-0">
          <div class="col-3 image-wrapper">
            <img
              src="@/assets/images/background/backgroundBlue.jpg"
              alt="backgroundBlue"
              class="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
          <div class="col-3 image-wrapper">
            <img
              src="@/assets/images/background/backgroundYellow.jpg"
              alt="backgroundYellow"
              class="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
          <div class="col-3 image-wrapper">
            <img
              src="@/assets/images/background/backgroundBlue.jpg"
              alt="backgroundBlue"
              class="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
          <div class="col-3 image-wrapper">
            <img
              src="@/assets/images/background/backgroundYellow.jpg"
              alt="backgroundYellow"
              class="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </div>
      <div class="landing mb-3">
        <h1 class="landingTitle">Contact Us</h1>
        <!-- <p class="landingText">
          If you have any questions or would like <br />to place an order,
          please don't hesitate to contact me.
        </p> -->
      </div>
      <div class="info">
        <div class="location mb-5" v-if="showLocation">
          <h5>LOCATION</h5>
          <ul class="list-unstyled contact-text">
            <li>
              Based in Ropes Crossing NSW 2760 <br />
              Servicing Sydney & Beyond
            </li>
          </ul>
        </div>
        <div class="opening mb-3" v-if="showHours">
          <h5>OPENING HOURS</h5>
          <ul class="list-unstyled contact-text">
            <li>By appointment only</li>
          </ul>
        </div>
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
<style scoped>
.contact-text {
  font-size: 1.2rem;
  line-height: 1.8;
}

.images-container {
  width: 100%;
  overflow: hidden;
}

.image-wrapper {
  height: 380px;
  overflow: hidden;
}

.object-fit-cover {
  object-fit: cover;
  height: 100%;
}
@media (max-width: 992px) {
  .image-wrapper {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .image-wrapper {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .image-wrapper {
    height: 100px;
  }
}
</style>
