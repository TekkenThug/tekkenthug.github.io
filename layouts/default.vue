<template>
  <div class="layout--default">
    <navbar />

    <main class="layout__main">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="sass">
  .layout
    &__main
      padding-top: 40px

    &--default
      background-color: #ffffff
      padding: 40px 30px
      display: flex
      flex-direction: column
      min-height: 100vh
</style>
