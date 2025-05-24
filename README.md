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

## Requirements

### Functional Requirements

#### Leave Request Management

-   Employees can submit, edit, and cancel vacation, sick leave, and personal time-off requests
-   Employees can view their remaining leave balance
-   Employees can check past (previous calendar year) and future (up to 1.5 years ahead) leave requests

#### Approval Workflow

-   Managers can approve/reject leave requests (optional for some employees)
-   Automated rules-based validation to enforce company policies (e.g., max leave days, blackout periods)
-   HR can override system restrictions when necessary (with audit logging)

#### Notifications

-   Email alerts sent to managers for pending approvals
-   Employees receive notifications on request status (approved/rejected)

#### Integration & Data Management

-   Interfaces with HR legacy systems to sync employee data
-   Provides a Web service API for other internal systems to query employee leave summaries
-   Uses the company's intranet single-sign-on (SSO) for authentication

#### Reporting & Logging

-   Maintains audit logs for all leave transactions (requests, approvals, overrides)
-   Managers can view team leave schedules
-   HR can generate reports on leave trends

#### Admin & Override Functions

-   HR can manually adjust leave balances if needed
-   Managers can award additional personal leave (within system limits)

### Non-Functional Requirements

#### Usability

-   Intuitive UI – Easy for employees and managers to use without training
-   WYSIWYG or simple formatting for leave notes (if text input is required)

#### Performance & Scalability

-   Handles concurrent requests during peak leave seasons
-   Fast response times for approvals and balance checks

#### Security & Compliance

-   Role-based access control (employees, managers, HR, admins)
-   Audit trails for all changes (for compliance & dispute resolution)
-   Data encrypted in transit and at rest

#### Reliability & Availability

-   High uptime (e.g., 99.9%) since leave requests are time-sensitive
-   Automatic backups to prevent data loss

#### Integration & Compatibility

-   Works with existing intranet portal and HR systems
-   Supports standard protocols (e.g., REST API for external queries)

#### Maintainability

-   Modular design for easy updates (e.g., changing leave policies)
-   Logging for troubleshooting

## Key Constraints

| Category  | Constraints                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| Technical | Intranet integration, SSO, legacy HR system dependencies, web-only            |
| Business  | HR retains some manual roles, manager approval flexibility, policy compliance |
| Security  | Audit logs, RBAC, data encryption                                             |
| Time/Data | Supports long-term scheduling, retains historical records                     |
| Usability | Simple UI, email notifications required                                       |
