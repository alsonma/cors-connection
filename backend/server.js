import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

const product = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Tablet", price: 15000 },
    { id: 4, name: "Headphones", price: 2500 },
    { id: 5, name: "Keyboard", price: 1500 },
    { id: 6, name: "Mouse", price: 800 },
    { id: 7, name: "Monitor", price: 12000 },
    { id: 8, name: "Smartwatch", price: 5000 },
    { id: 9, name: "Printer", price: 8000 },
    { id: 10, name: "Speaker", price: 3000 }
];

app.get("/products", (req, res) => {
    try {
        res.status(200).json({
            status: true,
            message: "API fetched successfully",
            data: product
        })
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Error",
            response: error.message
        })
    }
})

app.post("/createproduct", (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            res.status(400).json({
                status: false,
                message: "Fields needs to be filled"
            })
        }

        const newproduct = {
            id: product.length + 1,
            name: name,
            price: Number(price)
        }
        product.push(newproduct);

        res.status(200).json({
            status: true,
            message: "Products created successfully",
            data: newproduct
        })
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal error",
            response: error.message
        })
    }
})

app.delete("/delete/:id", (req, res) => {
    try {
        const deleteid = Number(req.params.id);
        const deleteproduct = product.findIndex(
            item => item.id == deleteid
        );
        if (deleteproduct === -1) {
            return res.status(401).json({
                status: false,
                message: "Product Not Found"
            })
        };
        const deleteproductbyid = product.splice(deleteproduct, 1);

        res.status(200).json({
            status: true,
            message: "product deleted successfully",
            data: deleteproductbyid[0]
        });

    }
    catch (error) {
        res.status(400).json({
            status: false,
            messsage: "Internal Error",
            response: error.message
        })
    }
})

app.listen(5000, () => {
    console.log(`Server is successfully running https://localhost:${5000}`)
})