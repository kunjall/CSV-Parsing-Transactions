const fs = require('fs');
const {parse} = require('csv-parse');
const Data = require('../models/data');

const parseCSV = async (file) => {
    return new Promise((resolve, reject) => {
        const assets = [];
        fs.createReadStream(file)
            .pipe(parse({ columns: true }))
            .on('data', (row) => {
                const { User_ID, UTC_Time, Operation, Market, 'Buy/Sell Amount': Amount, Price } = row;
                const [Base_Coin, Quote_Coin] = Market.split('/');
                const trade = {
                    userId: User_ID,
                    utc_time: new Date(UTC_Time),
                    operation: Operation,
                    basecoin: Base_Coin,
                    quotecoin: Quote_Coin,
                    amount: parseFloat(Amount),
                    price: parseFloat(Price)
                };
                assets.push(trade);
            })
            .on('end', () => {
                resolve(assets);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

const createData = async (req, res) => {
    try {
        const file = req.file; 
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const assets = await parseCSV(file.path);
        const createdAssets = await Data.insertMany(assets);
        res.status(201).json(createdAssets);
        
        
    } catch (error) {
        res.status(500).json(error);
    }
};

const balance = async (req, res) =>{
    try {
        const timestamp = new Date(req.body.timestamp);
        const convertedDate = timestamp.toISOString()
        const assets = await Data.find({ utc_time: { $lt: convertedDate } });

        const balance = {};
        assets.forEach(asset => {
            const { basecoin, operation, amount } = asset; 
            if (!balance[basecoin]) {
                balance[basecoin] = 0;
            }
            if (operation === 'Buy') {
                balance[basecoin] += amount;
            } else {
                balance[basecoin] -= amount;
            }
        });

        Object.keys(balance).forEach(key => {
            if (balance[key] === 0) {
                delete balance[key];
            }
        });

        res.json(balance);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
createData,
balance
}