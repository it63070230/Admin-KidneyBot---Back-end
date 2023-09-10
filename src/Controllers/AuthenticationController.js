const AuthProvider = require('../Components/AuthProvider')

class AuthenticationController {

    static async signup (req,res){
        const result = await AuthProvider.addPatient(req.body)
        return res.json(result)
    }

    static async signin(req,res){
        const {
            email,
            password
        } = req.body

        const token = await AuthProvider.patientSignIn(email,password)

        // if(token == null){
        //     res.json()
        // }

        const result = {
            "token" : token
        }

        res.json(result)
        
    }
}

module.exports = AuthenticationController