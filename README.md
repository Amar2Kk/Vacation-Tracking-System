# Vacation-Tracking-System

## Overview

This project involves developing a web-based Vacation Tracking System to help businesses manage employee vacation time more effectively. As modern workplaces evolve, employees often work across multiple projects and report to different managers, making it challenging for leaders to track and approve time-off requests informally.

## Problem Statement

The system addresses the difficulty of managing vacation time in decentralized work environments by:

-   Providing a centralized platform for employees to request time off and for managers to approve/reject requests
-   Integrating with the company's existing intranet for seamless access
-   Ensuring visibility of employee availability across teams to avoid scheduling conflicts

By automating vacation tracking, the system reduces administrative overhead and improves workforce planning.

## Vision

The Vacation Tracking System (VTS) aims to empower employees by giving them direct control over managing their vacation time, sick leave, and personal time off—without requiring deep knowledge of complex company policies.

## System Actors

| Actor        | Role & Responsibilities                                              |
| ------------ | -------------------------------------------------------------------- |
| Employee     | Requests and manages vacation time                                   |
| Manager      | Approves team leave requests and can award comp time (within limits) |
| HR Clerk     | Maintains employee records and can override system rules             |
| System Admin | Manages technical infrastructure and log files                       |

## Requirements

### Functional Requirements

| Category         | Features                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Leave Management | • Submit, edit, cancel requests<br>• View leave balance<br>• Check past/future leave (1.5 years ahead) |
| Workflow         | • Manager approval process<br>• Automated policy validation<br>• HR override capabilities              |
| Communication    | • Email notifications for approvals<br>• Status updates for employees                                  |
| Integration      | • HR system sync<br>• Web service API<br>• SSO authentication                                          |
| Reporting        | • Audit logging<br>• Team schedule views<br>• Leave trend analysis                                     |
| Administration   | • Manual balance adjustments<br>• Comp time awards                                                     |

### Non-Functional Requirements

| Category    | Requirements                                               |
| ----------- | ---------------------------------------------------------- |
| Usability   | • Intuitive interface<br>• Minimal training needed         |
| Performance | • Handle peak season load<br>• Quick response times        |
| Security    | • Role-based access<br>• Audit trails<br>• Data encryption |
| Reliability | • 99.9% uptime<br>• Automated backups                      |
| Integration | • Intranet compatibility<br>• Standard API support         |
| Maintenance | • Modular design<br>• System logging                       |

## Key Constraints

| Category  | Constraints                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| Technical | Intranet integration, SSO, legacy HR system dependencies, web-only            |
| Business  | HR retains some manual roles, manager approval flexibility, policy compliance |
| Security  | Audit logs, RBAC, data encryption                                             |
| Time/Data | Supports long-term scheduling, retains historical records                     |
| Usability | Simple UI, email notifications required                                       |

## System Design

### Data Model

<details>
<summary>Click to view Data Model</summary>

![Data Model](Data%20Modal/Data-Modal.png)

</details>

### Flow Charts

<details>
<summary>New Request Flow</summary>

![New Request Flow](Flow%20Charts/New-request-flow.png)

</details>

<details>
<summary>Request Edit Flow</summary>

![Request Edit Flow](Flow%20Charts/Request-edit-flow.png)

</details>

<details>
<summary>Request Withdrawal Flow</summary>

![Request Withdrawal Flow](Flow%20Charts/Request-withdrawal-flow.png)

</details>

<details>
<summary>Request Cancellation Flow</summary>

![Request Cancellation Flow](Flow%20Charts/Request-cancellation-flow.png)

</details>

### System Sequence

<details>
<summary>Click to view Sequence Diagram</summary>

![Sequence Diagram](Sequence%20Diagram/Sequence%20Diagram.png)

</details>

## Pseudocode Implementation

### Type Definitions

<details>
<summary>Types</summary>

```typescript
// types.ts
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
```

</details>

### Flow Implementations

<details>
<summary>New Request Flow</summary>

```typescript
// New-fequest-flow.ts
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
```

</details>

<details>
<summary>Request Edit Flow</summary>

```typescript
// Request-edit-flow.ts
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
```

</details>

<details>
<summary>Request Cancellation Flow</summary>

```typescript
// Request-cancellation-flow.ts
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
```

</details>

<details>
<summary>Request Withdrawal Flow</summary>

```typescript
// Request-withdrawal-flow.ts
import { Employee, HR_Database, Manager, VTS_System } from "./types";

async function withdrawFlow(
    employee: Employee,
    vts: VTS_System,
    db: HR_Database,
    manager: Manager
): Promise<void> {
    await employee.submitRequest(vts, "req1");
    console.log("VTS_System activated");
    await vts.confirm(employee, "Withdraw");
    await employee.confirm(vts, "req1");
    await vts.cancelNotify(manager, "req1");
    // Success: Revert balance
    await vts.revertBalance(db, "req1");
    await vts.returnToHome(employee);
    console.log("VTS_System deactivated");
}
```

</details>
