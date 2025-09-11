
const express = require('express')

const router = express.Router()


router.get('/somar', (req, res) => {
   
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB);
    
    soma = (numA + numB);
    res.json({ resultado : soma });
    });

 

    router.get('/subtrair', (req, res) => {
        
        const numA = Number(req.query.numA);
        const numB = Number(req.query.numB);

        subtracao = (numA - numB);
        res.json({ resultado : subtracao });
        })





    router.get('/multiplicar', (req, res) => {
        
        const numA = Number(req.query.numA);
        const numB = Number(req.query.numB);

        multiplicacao = (numA * numB);
        res.json({ resultado : multiplicacao });
        })

    



    router.get('/dividir', (req, res) => {
        
        const numA = Number(req.query.numA);
        const numB = Number(req.query.numB);

        divisao = (numA / numB);
        res.json({ resultado : divisao });
        })

  



    router.get('/aoQuadrado', (req, res) => {
        const numA = Number(req.query.numA);

        aoQuadrado = (numA * numA);
        res.json({ resultado : aoQuadrado });
        })
    


    router.get('/raizQuadrada', (req, res) => {
        const numA = Number(req.query.numA);

        raizQuadrada = Math.sqrt(numA);
        res.json({ resultado : raizQuadrada });
        })
  




module.exports = router