import {
    Email_Service,
    Employee,
    HR_Database,
    Manager,
    VTS_System,
} from "./types";

async function cancelFlow(
    employee: Employee,
    vts: VTS_System,
    db: HR_Database,
    email: Email_Service,
    manager: Manager
): Promise<void> {
    await employee.submitRequest(vts, "req1");
    console.log("VTS_System activated");
    if (await vts.isWithinCancelPeriod("req1")) {
        // Within 5 days
        await vts.confirm(employee, "Cancel with Explanation");
        await employee.confirm(vts, "req1");
        // Success: Log cancellation
        await db.logCancellation("req1");
    } else {
        await vts.confirm(employee, "Cancel");
        await employee.confirm(vts, "req1");
        // Success: Auto-revert
        await db.autoRevert("req1");
    }
    await vts.notifyManager(email, "req1");
    await email.sendCancelEmail(manager, "req1");
    console.log("VTS_System deactivated");
}
