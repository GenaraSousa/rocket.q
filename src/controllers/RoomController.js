const Database = require("../db/config")
module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password;
        let roomId = Math.floor(Math.random() * 10).toString();
        let roomExistIds;
        do {
            for (let i = 0; i < 5; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }
            // Verificar se id já existe
            roomExistIds = await db.all(`SELECT id FROM rooms WHERE id=${roomId}`);
            if (roomExistIds.length === 0) {
                // inserção
                await db.run(`INSERT INTO rooms (
                    id, pass
                ) VALUES (
                    ${roomId},
                    ${pass}
                )`)
            }
        } while (roomExistIds.length > 0)

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async enter(req, res){
        // const db = await 
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database();
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions = false;
        if (questions.length === 0  && questionsRead.length === 0){
            isNoQuestions = true;
        }
        // console.log(isNoQuestions);
        await db.close()
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    }

}