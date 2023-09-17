const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const AuthRepository = require("../Repository/AuthRepository");

class AuthProvider {

    static async addPatient(body){
        try {
            const { 
                firstName,
                lastName,
                gender,
                birthday,
                education,
                financial_status,
                caregiver,
                email,
                password
            } = body
            
            //Check is email existed?
            const oldEmail = await AuthRepository.findPatients(email)
            // console.log(oldEmail.docs.length)

            if(oldEmail.docs.length > 0){
                // console.log("This email already existed")
                return "This email already existed"
            }

            const encryptedPassword = await bcrypt.hash(password,10)

            const PatientInfoForAdd = {
                "firstName" : firstName,
                "lastName" : lastName,
                "gender" : gender,
                "birthday" : birthday,
                "education" : education,
                "financial_status" : financial_status,
                "caregiver" : caregiver,
                "email" : email,
                "password" : encryptedPassword,
                "weight_records": [],
                "blood_pressure_records": [],
                "behavior_records": [],
                "Hba1c_records": [],
                "eGFR_records": []
            }

            const result = await AuthRepository.addPatient(PatientInfoForAdd)

            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async patientSignIn(email,password){
        try {

            if(email == null || password == null){
                return null
            }

            const foundPatient = await AuthRepository.findPatients(email)

            if(foundPatient.docs.length == 0){
                return null
            }

            const comparePas =  await bcrypt.compare(password, foundPatient.docs[0].data().password)
            if(comparePas == false){
                return null
            }


            const token = jwt.sign({"email" : email,"id" : foundPatient.docs[0].id,"is_admin": false}, process.env.TOKEN_SECRET);

            return token
            
        } catch (error) {
            console.log(error)
        }
    }


    static async addAdmin(body){
        try {
            const { 
                firstname,
                lastname,
                username,
                password,
                role
            } = body
            
            //Check is email existed?
            const oldUsername = await AuthRepository.findAdmins(username)
            // console.log(oldEmail.docs.length)

            if(oldUsername.docs.length > 0){
                // console.log("This email alread existed")
                return "This user alread existed"
            }

            const encryptedPassword = await bcrypt.hash(password,10)

            const StaffInfoForAdd = {
                "firstname" : firstname,
                "lastname" : lastname,
                "username" : username,
                "password" : encryptedPassword,
                "role" : role
            }

            const result = await AuthRepository.addAdminStaff(StaffInfoForAdd)

            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async AdminSignIn(username,password){
        try {

            if(username == null || password == null){
                return null
            }

            const foundAdmin = await AuthRepository.findAdmins(username)

            if(foundAdmin.docs.length == 0){
                return null
            }

            const comparePas =  await bcrypt.compare(password, foundAdmin.docs[0].data().password)
            if(comparePas == false){
                return null
            }

            // const token = jwt.sign({email}, process.env.TOKEN_SECRET, { expiresIn: '30s' });
            const token = jwt.sign({"username" : username,"id" : foundAdmin.docs[0].id, "is_admin": true}, process.env.TOKEN_SECRET);

            return token
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AuthProvider