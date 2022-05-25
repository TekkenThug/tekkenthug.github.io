<template>
  <li class="event-item">
    <div class="event-item__image">
      <img :src="imageUrl" alt="event image">
    </div>
    <div class="event-item__footer">
      <div class="event-item__title">
        {{ title }}
      </div>

      <div class="event-item__info">
        <span><strong>Дата: </strong>{{ date }}</span>
        <span v-if="time"><strong>Время: </strong>{{ time }}</span>
      </div>
    </div>

    <a
      :href="url"
      class="event-item__cover"
      target="_blank"
    >
      Подробнее
    </a>
  </li>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "assets/global.sass"
  .event-item
    cursor: pointer
    position: relative
    display: flex
    flex-direction: column
    border: 2px solid black

    &__footer
      padding: 10px
      flex-grow: 1
      display: flex
      flex-direction: column

    &__image
      img
        display: block
        width: 100%
        height: 200px
        object-fit: cover

    &__title
      font-size: 24px
      font-weight: 500
      margin-bottom: 25px

    &__info
      display: flex
      flex-direction: column
      margin-top: auto

      span:not(:last-child)
        margin-bottom: 5px

    &__cover
      position: absolute
      display: flex
      justify-content: center
      align-items: center
      text-decoration: none
      font-size: 24px
      font-weight: 500
      color: #ffffff
      width: 100%
      top: 0
      left: 0
      height: 100%
      background-color: #ce2424
      opacity: 0
      @include trans

    &:hover &__cover
      opacity: 1
</style>
