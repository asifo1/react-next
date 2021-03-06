var fs = require('fs'); 

export default (req, res) => {

  if (req.method === 'POST') {
    let newData = JSON.parse(req.body)
    let data = fs.readFileSync("Data/products.json",'utf8')
    let products = JSON.parse(data)
    for(let j=0;j<products.length;j++){
        for(let i=0;i<newData.length;i++){
            if(newData[i].id===products[j].id){
              if(products[j].quantity<newData[i].cart_qty){   //If stock in empty return 400
                res.status(400).json({id:newData[i].id})
                res.end()
                return
              }
              products[j].quantity -= newData[i].cart_qty
              break
            } 
        }
    }
    fs.writeFile("Data/products.json",JSON.stringify(products),(err)=>{if(err)console.log(err)})

    res.status(201).json({})
  }

  else{
    const data = fs.readFileSync("Data/products.json",'utf8')
    if(req.query.id!=null){
      const product =  JSON.parse(data).filter(item=>{
          return item.id == req.query.id
      })
      if(product.length) 
          res.status(200).json(product[0])
      else res.status(404).json({err:'No Product Found'})
    }
    else{
      res.status(200).json(JSON.parse(data))
    }
  }
}
