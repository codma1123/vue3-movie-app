const axios = require('axios')
const OMDB_API_KEY = '7035c60c'

exports.handler = async function (event){
  console.log(event)
  const payload = JSON.parse(event.body)
  const {
    title,
    type,
    year,
    page,
    id
  } = payload
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try{
    const {data} = await axios.get(url)
    if(data.Error){
      return {
        statusCode: 400,    //잘못된 요청 처리
        body: data.Error      //문자열
      }
    }
    return{
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }catch(error){
    return {
      statusCode: error.response.status,
      body: error.message
    }   
  }
}