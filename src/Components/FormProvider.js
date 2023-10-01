const FormRepository = require("../Repository/FormRepository");
const TokenChecker = require("./TokenChecker");

class FormProvider{

    static async getForms(){
        const result = await FormRepository.getForms()
        return result
    }

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

    static async updateForm(token,reqBody){
        const deToken = TokenChecker.isTokenValid(token)
        if(deToken == null || deToken.is_admin == false){
            return null
        }

        const id = reqBody.id
        const question = reqBody.question

        const result = await FormRepository.updateForm(id,question)
        return result
    }

    static async deleteForm(token,reqBody){
        const deToken = TokenChecker.isTokenValid(token,reqBody)
        if(deToken == null || deToken.is_admin == false){
            return null
        }
        const id = reqBody.id

        const result = await FormRepository.deleteForm(id)

        return result
    }

    static async getBehaviorForms(token){
        const deToken = TokenChecker.isTokenValid(token)
        if(deToken == null){
            return null
        }

        const result = await FormRepository.getBehaviorForms()
        return result
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

        return result
    }

    static async updateBehaviorForm(token,reqBody){
        const deToken = TokenChecker.isTokenValid(token)
        if(deToken == null || deToken.is_admin == false){
            return null
        }

        const id = reqBody.id
        const question = reqBody.question

        const result = await FormRepository.updateForm(id,question)
        return result

    }

    static async deleteBehaviorForm(token,reqBody){
        const deToken = TokenChecker.isTokenValid(token,reqBody)
        if(deToken == null || deToken.is_admin == false){
            return null
        }
        const id = reqBody.id

        const result = await FormRepository.deleteForm(id)

        return result


    }




}

module.exports = FormProvider;