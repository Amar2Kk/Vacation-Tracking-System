import { Employee, HR_Database, Manager, VTS_System } from "./types";

async function withdrawFlow(
    employee: Employee,
    vts: VTS_System,
    manager: Manager,
    db: HR_Database
): Promise<void> {
    await employee.submitRequest(vts, "req1");
    console.log("VTS_System activated");
    await vts.confirm(employee, "Withdraw");
    await employee.confirm(vts, "req1");
    await vts.cancelNotify(manager, "req1");
    // Success: Revert balance
    await vts.revertBalance(db, "req1");
    console.log("VTS_System deactivated");
}
