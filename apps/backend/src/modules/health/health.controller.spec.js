"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const health_controller_1 = require("./health.controller");
(0, vitest_1.describe)('HealthController', () => {
    (0, vitest_1.it)('should return ok status with timestamp', () => {
        const controller = new health_controller_1.HealthController();
        const result = controller.check();
        (0, vitest_1.expect)(result.status).toBe('ok');
        (0, vitest_1.expect)(result.timestamp).toBeDefined();
        (0, vitest_1.expect)(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });
});
//# sourceMappingURL=health.controller.spec.js.map