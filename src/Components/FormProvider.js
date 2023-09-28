const FormRepository = require("../Repository/FormRepository");
const TokenChecker = require("./TokenChecker");

class FormProvider{

    static async addForms(token,reqBody){
        try {
            const deToken = TokenChecker.isTokenValid(token)
            if(deToken.is_admin == false){
                return null
            }

            let result = []

            for(let i in reqBody){
                let dataObject = {
                    "question" : reqBody[i].question,
                    "created_time" : reqBody[i].created_time,
                    "created_by_staff_id" : deToken.id,
                    "is_behavior" : false
                } 

                const addedDoc = await FormRepository.addForm(dataObject)

                result.push(dataObject["id"] = addedDoc.id) 
            }
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async addBehaviorForms(token,reqBody){
        const deToken = TokenChecker.isTokenValid(token)
        if(deToken.is_admin == false){
            return null
        }

        let result = []

        for(let i in reqBody){
            let dataObject = {
                "question" : reqBody[i].question,
                "created_time" : reqBody[i].created_time,
                "created_by_staff_id" : deToken.id,
                "is_behavior" : true
            }

            const addedDoc = await FormRepository.addForm(dataObject)

            result.push(dataObject["id"] = addedDoc.id) 
        }
    }

    static async getBehaviorForms(token){
        const deToken = TokenChecker.isTokenValid(token)
        if(deToken == null){
            return null
        }

        const result = await FormRepository.getBehaviorForms()
        return result
    }




}

module.exports = FormProvider;