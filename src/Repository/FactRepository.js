
const db = require('../Data/db')

class FactRepository{

    static async addFact(fact){
        const result = await addDoc(collection(db, "Fact"), fact);
        return result
    }

    static async getFacts(){
        const recordRef = collection(db, "Fact");
        const result = await getDocs(recordRef)
        return result
    }
}

module.exports = FactRepository;