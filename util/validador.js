

function validarBusdaHorario(req, res, next) {

    switch (req.body.tipo) {
        case "1":

            if (req.body.fecha != null &&
                req.body.auditorio != null &&
                req.body.horario != null &&
                typeof req.body.auditorio === 'number') {
                next();
            } else {
                res.status(400).send({ "mensaje": "bad request" })
            }
            break;
        case "2":
            if (req.body.fechaInicio != null &&
                req.body.fechaFin != null &&
                req.body.auditorio != null &&
                req.body.horario != null &&
                typeof req.body.auditorio === 'number' &&
                (new Date(req.body.fechaInicio) - new Date(req.body.fechaFin)) < 1) {
                next();
            } else {
                res.status(400).send({ "mensaje": "bad request" })
            }
            break;

        case "3":

            if (req.body.fechaInicio != null &&
                req.body.fechaFin != null &&
                req.body.auditorio != null &&
                req.body.horario != null &&
                typeof req.body.auditorio === 'number' &&
                (new Date(req.body.fechaInicio) - new Date(req.body.fechaFin)) < 1) {
                next();
            } else {
                res.status(400).send({ "mensaje": "bad request" })
            }
            break;

        default:
            res.status(400).send("Bad Request");
            break;
    }
}


module.exports.validarBusdaHorario = validarBusdaHorario;