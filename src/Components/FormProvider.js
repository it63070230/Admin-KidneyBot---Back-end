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
                const dataObject = {
                    "question" : reqBody[i].question,
                    "created_time" : reqBody[i].created_time,
                    "created_by_staff_id" : deToken.id
                }

                const addedData = await FormRepository.addForm(dataObject)

                result.push(addedData) 
            }
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = FormProvider;