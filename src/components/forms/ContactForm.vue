<template>
  <div>
    <div class="col-12">
      <img
        src="@/assets/images/icons/divider.png"
        alt="Jenny's Flowers Logo"
        height="150"
        class="d-inline-block align-text-top rounded-circle"
      />
    </div>
    <div>
      <form>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Name *</label
          >
          <input
            type="name"
            class="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Phone *</label
          >
          <input
            type="Phone"
            class="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email address *</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Message</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm'
}
</script>
