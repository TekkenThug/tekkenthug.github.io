<template>
  <div class="event">
    <h2 class="event__title">
      {{ title }}
    </h2>

    <ul class="event__list">
      <event-item
        v-for="(item, index) in eventItems"
        :key="index"
        :title="item.title"
        :image-url="item.imageUrl"
        :url="item.url"
        :date="item.date"
        :time="item.time"
      />
    </ul>
  </div>
</template>

<script>
import config from '~/config'
import EventItem from '~/components/Event/EventItem'

export default {
  name: 'CategoryPage',
  components: { EventItem },
  asyncData ({ params }) {
    return {
      slug: params.category
    }
  },
  data () {
    return {
      slug: ''
    }
  },
  computed: {
    title () {
      return config.categories.find(item => item.slug === this.slug).title
    },
    eventItems () {
      return config.categories.find(item => item.slug === this.slug).events
    }
  }
}
</script>

<style scoped lang="sass">
@import "/assets/variables"

.event
  &__list
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-column-gap: 20px
    grid-row-gap: 20px
    grid-auto-rows: 1fr

    @include lg
      grid-template-columns: repeat(3, 1fr)

    @include md
      grid-template-columns: repeat(2, 1fr)

    @include s
      grid-template-columns: repeat(1, 1fr)
</style>
