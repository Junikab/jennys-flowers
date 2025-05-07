<template>
  <div class="contact-form-container">
    <div class="col-12">
      <img
        src="@/assets/images/icons/divider.png"
        alt="Jenny's Flowers Logo"
        height="150"
        class="d-inline-block align-text-top rounded-circle"
      />
    </div>
    <p class="text-center contact-intro">
      Please fill in the contact form below or email us at
      <a href="mailto:junikab@gmail.com">junikab@gmail.com</a>
    </p>
    <div>
      <form
        action="https://formsubmit.co/junikab@gmail.com"
        method="POST"
        class="mt-4"
      >
        <input
          type="hidden"
          name="_next"
          value="https://junikab.github.io/jennys-flowers/"
        />

        <div class="client-info text-start">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name *</label
            >
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Phone *</label
            >
            <input type="tel" name="phone" class="form-control" id="tel" />
          </div>
          <div class="mb-5">
            <label for="exampleFormControlInput1" class="form-label"
              >Email address *</label
            >
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Message *</label
            >
            <textarea
              class="form-control"
              name="message"
              type="text"
              id="message"
              rows="3"
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-dark px-4 py-2">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm'
}
</script>
<style scoped>
.contact-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.contact-intro {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.client-info {
  font-size: 1.3rem;
}

.form-control {
  border: 2px solid #333;
  border-radius: 0;
  padding: 0.75rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: rgb(48, 17, 35, 0.8);
}

.btn {
  min-width: 120px;
  background-color: rgb(48, 17, 35, 0.8);
  border-radius: 0;
  font-size: 1.3rem;
}
.btn:hover {
  background-color: rgb(180, 98, 152);
}

/* Make the form look good on phones */
@media (max-width: 768px) {
  .contact-form-container {
    padding: 10px;
  }
}
</style>
