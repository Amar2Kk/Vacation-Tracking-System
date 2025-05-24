import { Employee, HR_Database, Manager, VTS_System } from "./types";

async function editPendingRequestFlow(
    employee: Employee,
    vts: VTS_System,
    db: HR_Database,
    manager: Manager
): Promise<void> {
    await employee.submitRequest(vts, "req1");
    console.log("VTS_System activated");
    await vts.showEditableRequest(employee, "req1");
    await employee.submitChanges(vts, "req1");
    if (await vts.validate("req1")) {
        // Success: Update request
        await db.updateRequest("req1");
    } else {
        await vts.showErrors(employee);
        if (await vts.isWithinWithdrawPeriod("req1")) {
            // Within 5 days
            await vts.confirm(employee, "Withdraw");
            await employee.confirm(vts, "req1");
            await vts.cancelNotify(manager, "req1");
            // Success: Revert balance
            await vts.revertBalance(db, "req1");
        }
    }
    await vts.returnToHome(employee);
    console.log("VTS_System deactivated");
}
