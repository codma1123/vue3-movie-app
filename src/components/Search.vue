<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          value=""
          v-if="filter.name === 'year'">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
  data(){
    return{
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items:[10, 20, 30]
        },
        {
          name: 'year',
          items: (()=>{
            const years = []
            const thisYear = new Date().getFullYear() 
            for(let i=thisYear; i>=1985; i--){
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply(){
      // store의 Mutaions를 실행할때는 .commit()
      //         Actions를 실행할때는 .dispatch() 메소드를 사용
      // this.$store.dispatch('index.js에 명시되어있는 모듈명/Actions')
      this.$store.dispatch('movie/searchMovies', {
        title :this.title,
        type :this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child{
      margin-right: 0px;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child{
        margin-right: 0px;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;   //가로넓이가 줄어드는것을 방지
    }
  @include media-breakpoint-down(lg){
    display:block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select{
        width: 100%;
      }
    }
    .btn{
      width: 100%;
    }
  } 
}

</style>