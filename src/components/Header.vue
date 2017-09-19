<template lang="html">
  <div class="columns q-header">
    <div class="column col-10">
      <h1 id="q-main-msg">Quarry</h1>
    </div>
    <div class="column col-2 q-logout">
      <span class="q-fake-link"
            v-if="loggedIn"
            @click="logout">
            Logout
      </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>

<style lang="css">

.q-header {
  padding-top: 1em;
}

.q-logout {
  padding-top: 1em;
}

.q-fake-link {
  cursor: pointer;
}
</style>
