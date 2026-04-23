"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoFactura = exports.EstadoCita = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["PSICOLOGO"] = "PSICOLOGO";
    Roles["PSIQUIATRA"] = "PSIQUIATRA";
    Roles["RECEPCIONISTA"] = "RECEPCIONISTA";
    Roles["CONTADOR"] = "CONTADOR";
})(Roles || (exports.Roles = Roles = {}));
var EstadoCita;
(function (EstadoCita) {
    EstadoCita["PENDIENTE"] = "PENDIENTE";
    EstadoCita["CONFIRMADA"] = "CONFIRMADA";
    EstadoCita["CANCELADA"] = "CANCELADA";
    EstadoCita["COMPLETADA"] = "COMPLETADA";
    EstadoCita["NO_ASISTIO"] = "NO_ASISTIO";
})(EstadoCita || (exports.EstadoCita = EstadoCita = {}));
var EstadoFactura;
(function (EstadoFactura) {
    EstadoFactura["BORRADOR"] = "BORRADOR";
    EstadoFactura["EMITIDA"] = "EMITIDA";
    EstadoFactura["PAGADA"] = "PAGADA";
    EstadoFactura["ANULADA"] = "ANULADA";
})(EstadoFactura || (exports.EstadoFactura = EstadoFactura = {}));
//# sourceMappingURL=index.js.map