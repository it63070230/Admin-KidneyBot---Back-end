const FormProvider = require("../Components/FormProvider");

class FormController {
    
    static async getForm(req,res){

    }

    static async addForm(req,res){
        const result = await FormProvider.addForms(req.headers.authorization,req.body)
        res.json(result)
    }

    static async updateForm(req,res){

    }

    static async deleteForm(req,res){

    }
}

module.exports = FormController;