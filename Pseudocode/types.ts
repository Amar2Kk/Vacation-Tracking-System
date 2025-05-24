export interface VacationRequest {
    id: string;
    state: "Pending" | "Approved" | "Rejected" | "Withdrawn" | "Canceled";
}

export interface Employee {
    submitRequest(vts: VTS_System, id: string): Promise<void>;
    confirm(vts: VTS_System, id: string): Promise<void>;
    submitChanges(vts: VTS_System, id: string): Promise<void>;
}

export interface VTS_System {
    showStatus(employee: Employee): Promise<void>;
    validate(id: string): Promise<boolean>;
    needsApproval(id: string): Promise<boolean>;
    sendApprovalLink(email: Email_Service, manager: Manager): Promise<void>;
    sendRejection(employee: Employee): Promise<void>;
    autoApprove(db: HR_Database, id: string): Promise<void>;
    showErrors(employee: Employee): Promise<void>;
    returnToHome(employee: Employee): Promise<void>;
    sendResult(email: Email_Service, id: string): Promise<void>;
    updateUI(employee: Employee): Promise<void>;
    confirm(employee: Employee, action: string): Promise<void>;
    cancelNotify(manager: Manager, id: string): Promise<void>;
    revertBalance(db: HR_Database, id: string): Promise<void>;
    logCancellation(db: HR_Database, id: string): Promise<void>;
    autoRevert(db: HR_Database, id: string): Promise<void>;
    notifyManager(email: Email_Service, id: string): Promise<void>;
    showEditableRequest(employee: Employee, id: string): Promise<void>;
    updateRequest(db: HR_Database, id: string): Promise<void>;
    isWithinCancelPeriod(id: string): Promise<boolean>;
    isWithinWithdrawPeriod(id: string): Promise<boolean>;
}

export interface Manager {
    review(vts: VTS_System, id: string): Promise<boolean>;
}

export interface HR_Database {
    logApproval(id: string): Promise<void>;
    autoApprove(id: string): Promise<void>;
    revertBalance(id: string): Promise<void>;
    logCancellation(id: string): Promise<void>;
    autoRevert(id: string): Promise<void>;
    updateRequest(id: string): Promise<void>;
}

export interface Email_Service {
    sendApprovalEmail(manager: Manager, link: string): Promise<void>;
    sendStatusEmail(employee: Employee, id: string): Promise<void>;
    sendCancelEmail(manager: Manager, id: string): Promise<void>;
}
