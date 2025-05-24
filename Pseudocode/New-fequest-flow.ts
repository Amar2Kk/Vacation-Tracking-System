import {
    Email_Service,
    Employee,
    HR_Database,
    Manager,
    VTS_System,
} from "./types";

async function submitRequestFlow(
    employee: Employee,
    vts: VTS_System,
    email: Email_Service,
    manager: Manager,
    db: HR_Database
): Promise<void> {
    await employee.submitRequest(vts, "req1");
    console.log("VTS_System activated");
    await vts.showStatus(employee);
    if (await vts.validate("req1")) {
        if (await vts.needsApproval("req1")) {
            await vts.sendApprovalLink(email, manager);
            await email.sendApprovalEmail(manager, "link");
            if (await manager.review(vts, "req1")) {
                // Success: Log approval
                await db.logApproval("req1");
            } else {
                await vts.sendRejection(employee);
            }
        } else {
            // Success: Auto-approve
            await vts.autoApprove(db, "req1");
        }
    } else {
        await vts.showErrors(employee);
        await employee.submitRequest(vts, "req1");
    }
    await vts.returnToHome(employee);
    console.log("VTS_System deactivated");
}
