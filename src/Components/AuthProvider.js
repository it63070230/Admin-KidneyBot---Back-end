const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const AuthRepository = require("../Repository/AuthRepository");

class AuthProvider {

    static async addPatient(body){
        try {
            const { 
                userId
            } = body
            
            //Check is userId existed?
            const olduserId = await AuthRepository.findPatients(userId)
            // console.log(olduserId.docs.length)

            if(olduserId.docs.length > 0){
                // console.log("This userId already existed")
                return "This userId already existed"
            }

            let objectForAdd = body


            const result = await AuthRepository.addPatient(userId, objectForAdd)

            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async patientSignIn(userId){
        try {

            if(userId == null){
                return null
            }

            const foundPatient = await AuthRepository.findPatients(userId)

            if(foundPatient.docs.length == 0){
                return null
            }

            const token = jwt.sign({"userId" : userId,"id" : foundPatient.docs[0].id,"is_admin": false}, process.env.TOKEN_SECRET);

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
            
            //Check is userId existed?
            const oldUsername = await AuthRepository.findAdmins(username)
            // console.log(oldUsername.docs.length)

            if(oldUsername.docs.length > 0){
                // console.log("This userId alread existed")
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

            // const token = jwt.sign({userId}, process.env.TOKEN_SECRET, { expiresIn: '30s' });
            const token = jwt.sign({"username" : username,"id" : foundAdmin.docs[0].id, "is_admin": true}, process.env.TOKEN_SECRET);

            return token
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AuthProvider
