<template>
  <div class="feedback-card">
    <div class="feedback-header">SEND FEEDBACK</div>
    <form class="feedback-body" @submit.prevent="onSubmit">
      <input
        v-model.lazy.trim="name"
        type="text"
        class="feedback-body__field"
        placeholder="Name"
      />
      <input
        v-model.lazy.trim="email"
        type="email"
        class="feedback-body__field"
        placeholder="Email"
      />
      <input
        v-model.lazy.trim="subject"
        type="subkject"
        class="feedback-body__field"
        placeholder="Subject"
      />
      <textarea
        v-model.lazy.trim="message"
        type="text"
        class="feedback-body__field"
        placeholder="Message"
      ></textarea
      ><button class="feedback-body__submit" type="submit">SEND</button>
    </form>
  </div>
</template>

<script>
import { EmailAddressEnum } from '~/enums'
export default {
  name: 'IndexPage',
  data() {
    return {
      name: '',
      message: '',
      subject: '',
      email: '',
    }
  },
  methods: {
    async onSubmit() {
      // you can use axios or any other library
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            to: EmailAddressEnum.sample,
            name: this.name,
            email: this.email,
            message: this.message,
            subject: this.subject,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })

        const data = await response.json()

        // Handle the response
        console.log(data)

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2500))
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
<style>
* {
  font-family: 'Roboto', sans-serif;
}
body {
  margin: 0;
  padding: 0;
  background-color: #a2a2a2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
input,
button,
textarea {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-image: none;
  background-color: #dadad3;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  padding: 5px;
}
input:focus,
button:focus,
textarea:focus {
  outline: none;
}
textarea {
  min-height: 50px;
  resize: vertical;
}
button {
  cursor: pointer;
  font-weight: 500;
}
.feedback-card {
  border: 1px solid black;
  background-color: #fff;
  max-width: 450px;
  margin: 0 auto;
  box-shadow: -0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26);
}
.feedback-header {
  text-align: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid black;
}
.feedback-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.feedback-body button {
  margin-top: 10px;
  align-self: flex-end;
}
</style>
