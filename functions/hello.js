exports.handler = async function (event, context){
  return{
    statusCode: 200,
    body: JSON.stringify({
      name: "codma",
      age: 77,
      email: 'ruddud1123@naver.com'
    })
  }
}