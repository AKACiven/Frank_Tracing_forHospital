const data = {
  'items': [
    { "value": "眼科" },
    { "value": "骨科" },
    { "value": "儿科" },
    { "value": "泌尿科" },
    { "value": "消化道科" },
    { "value": "口腔科" },
    { "value": "牙科" },
    { "value": "皮肤科" },
  ]
}

module.exports = [
  {
    url: '/departmentlist',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
