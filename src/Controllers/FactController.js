const FactProvider = require("../Components/Factprovider");


class FactController{

    static async addFact(req,res){
        const result = await FactProvider.addFact()

    }

    static async getFacts(req,res){

        res.json(result)
    }
}

module.exports = FactController;