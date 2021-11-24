const router = require('express').Router();
const {models:{Author, Book}} = require('../db');


router.get('/authors', async(req, res, next)=>{
    try{
        res.send(await Author.findAll());
    }catch(ex){
        next(ex);
    }
})

router.get('/books', async(req, res, next)=>{
    try{
        res.send(await Book.findAll());
    }catch(ex){
        next(ex);
    }
})

router.get("/authors/:id/authored", async (req, res, next)=>{
    try{
      res.send(
          await Author.findByPk(req.params.id, {
            
            include: [
              {model: Book, as: "authored"}
            ]
          })
      )
    }
    catch(ex){
        next(ex);
    }
});

// router.get('/authors/:id/authored', async(req, res, next)=>{
//     try{
//         res.send(await Author.findAll({
//             where:{
//                 userId: req.params.id,
//             },
//             include: [
//                 Book,
//             ]
//         }));
//     }catch(ex){
//         next(ex);
//     }
// })

// router.post('/users/:id/sales', async(req, res, next)=>{
//     try{
//         let sale = await Sale.create({...req.body, userId: req.params.id});
//         sale = await Sale.findByPk(sale.id,{
//             include:[Car]
//         })
//         res.send(sale);
        
//     }catch(ex){
//         next(ex);
//     }
// })

module.exports = router;