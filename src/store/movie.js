import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {

  //module movie.js를 모듈로 명시 가능
  namespaced: true,

  //data
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),

  //computed        
  getters: {

  },

  //methods
  //데이터 변경
  mutations: {
    updateState(state, payload) {
      // 객체데이터로 새로운 배열을 만들고 할당함
      // ['movies' , 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },

  // 비동기
  actions: {
    // context  - state, getter, mutations 조작
    // payload - searchMovies가 실행될때 인수
    async searchMovies({state, commit}, payload) {

      // searchMovies 동작을 여러번 실행시키는것을 방지
      if(state.loading){
        return
      }
      // 검색 시작 전 message 초기화
      commit('updateState',{
        message: '',
        loading: true
      })
      try{
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })
      const {Search, totalResults} = res.data
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      const total = parseInt(totalResults, 10)

      const pageLength = Math.ceil(total / 10)

      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page++) {
          if (page > (payload.number / 10)) break

          const res = await _fetchMovie({
            ...payload,
            page
          })
          const {
            Search
          } = res.data
          commit('updateState', {
            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
          })
        }
      }
      }catch(message){
          commit('updateState', {
            movies: [],
            message
          })
      }finally {
        commit('updateState',{
          loading: false
        })
      }
    },
    // searchMovieWithId
    async searchMovieWithId({state, commit} ,payload){
      if(state.loading) return

      commit('updateState',{

        //기존에 검색했던 내용이 다시 표시되는것을 방지
        theMovie: {},

        loading: true
      })
      
      try{
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState',{
          theMovie: res.data
        })
      } catch(error){
        commit('updateState',{
          theMovie: {}
        })
      } finally{
        commit('updateState',{
          loading: false
        })
      }
    }
  }
}
// 현재파일 내에서만 처리되는 의미로 _를 붙임.
function _fetchMovie(payload) {
  const {
    title,
    type,
    year,
    page,
    id
  } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err=>{
        reject(err.message)
      })
  })
}