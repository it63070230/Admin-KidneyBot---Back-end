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

    static async getBehaviorForms(req,res){
        try {
            const result = await FormProvider.getBehaviorForms(req.headers.authorization,req.body)
            res.json(result)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async addBehaviorForms(req,res){
        try {
            const result = await FormProvider.addBehaviorForms(req.headers.authorization)
            res.json(result)
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = FormController;