import express from "express";

const app = express()

app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'Laptop',
            price: 1200,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Laptop_%28PSF%29_%28cropped%29.jpg/440px-Laptop_%28PSF%29_%28cropped%29.jpg'
        },
        {
            id: 2,
            name: 'Smartphone',
            price: 800,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/IPhone_12_Pro_Max_%28back%29.jpg/440px-IPhone_12_Pro_Max_%28back%29.jpg'
        },
        {
            id: 3,
            name: 'Tablet',
            price: 500,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/IPad_Air_2_%28back%29.jpg/440px-IPad_Air_2_%28back%29.jpg'
        },
        {
            id: 4,
            name: 'Desktop Computer',
            price: 1500,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Computer-Desktop.svg/440px-Computer-Desktop.svg.png'
        },
        {
            id: 5,
            name: 'Gaming Console',
            price: 300,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/PlayStation_5_console_%26_controller.jpg/440px-PlayStation_5_console_%26_controller.jpg'
        }
    ];

    if(req.query.search){
       const filteredProducts = products.filter((product)=> product.name.toLowerCase().includes(req.query.search.toLowerCase()))
       res.send(filteredProducts)
       return;
    }

    setTimeout(() => {
        res.send(products)
    }, 3000);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000/api/products`)
})