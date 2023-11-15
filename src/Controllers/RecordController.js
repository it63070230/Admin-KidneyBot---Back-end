
const RecordProvider = require("../Components/RecordProvider")

class RecordController {

    static async adminQueryRecords(req, res) {
        try {
            const { patientIds, lineIds, recordTypes } = req.query;
            const token = req.headers.authorization;

            const patientIdsArray = patientIds ? patientIds.split(",") : null;
            const lineIdsArray = lineIds ? lineIds.split(",") : null;
            const recordTypesArray = recordTypes ? recordTypes.split(",") : null;


            const result = await RecordProvider.queryRecords(token, patientIdsArray, lineIdsArray, recordTypesArray);

            if (result) {
                return res.json(result);
            } else {
                return res.status(404).json({ error: "No matching records found." });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getRecords(req, res) {
        const result = await RecordProvider.getPatientRecords(req.headers.authorization)
        return res.json(result)
    }

    static async addSubRecord(req, res) {

        const result = await RecordProvider.addSubRecord(req.body, req.headers.authorization, req.params.sub_record)

        return res.json(result)
    }

    static async adminAddSubRecord(req, res) {
        try {
            const { patientId, data } = req.body;
            const token = req.headers.authorization;
            const sub_record = req.params.sub_record

            const result = await RecordProvider.adminAddSubRecord(patientId, sub_record, data, token);
            if (result) {
                return res.json({ message: "Sub-record added successfully" });
            } else {
                return res.status(404).json({ message: "Sub-record not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateSubRecord(req, res) {
        try {
            const { patientId, subRecordIndex, data } = req.body;
            const token = req.headers.authorization;
            const sub_record = req.params.sub_record

            const result = await RecordProvider.updateSubRecord(patientId, subRecordIndex, sub_record, data, token);
            if (result) {
                return res.json({ message: "Sub-record updated successfully" });
            } else {
                return res.status(404).json({ message: "Sub-record not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteSubRecord(req, res) {
        try {
            const { patientId, subRecordIndex } = req.body;
            const token = req.headers.authorization;
            const sub_record = req.params.sub_record

            const result = await RecordProvider.deleteSubRecord(patientId, subRecordIndex, sub_record, token);
            if (result) {
                return res.json({ message: "Sub-record deleted successfully" });
            } else {
                return res.status(404).json({ message: "Sub-record not found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = RecordController

