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
