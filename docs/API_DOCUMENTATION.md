# API Documentation

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Payment](#payment)
- [Profile & Password](#profile--password)
- [Support & FAQ](#support--faq)
- [Status Codes](#status-codes)

## Overview

PayFlow API documentation describes the interfaces used for authentication, dashboard analytics, payment management, profile settings, customer support, and FAQs.

# Authentication

PayFlow provides **3 authentication endpoints**:

- Login
- Register
- Logout

**The following section shows one representative endpoint. The remaining endpoints follow a similar documentation flow.**

## Endpoint

### Login

**POST** `/auth/login`

Authenticates an existing user.

### Request

- Method: `POST`
- URL: `/auth/login`
- Headers: None
- Request Body:

| Field | Type | Description |
|---|---|---|
| email | string | Registered email address |
| password | string | Account password |

### Response

| Field | Type | Description |
|---|---|---|
| id | string | Unique user ID |
| name | string | User's name |
| email | string | User's email address |

**Error Response**

Returns an appropriate error response for invalid credentials.

# Dashboard

PayFlow provides **4 dashboard endpoints**:

- Get Dashboard Statistics
- Get Monthly Payment Data
- Get Recent Payments
- Get Notifications

**The following section shows one representative endpoint. The remaining endpoints follow a similar documentation flow.**

## Endpoint

### Get Dashboard Statistics

**GET** `/dashboard/stats`

Returns payment statistics displayed on the dashboard.

### Request

| Field | Type | Description |
|---|---|---|
| — | — | No request body required |

### Response

| Field | Type | Description |
|---|---|---|
| totalPayments | number | Total number of payments |
| completedPayments | number | Number of completed payments |
| pendingPayments | number | Number of pending payments |
| failedPayments | number | Number of failed payments |
| totalRevenue | number | Total payment revenue |

**Error Response**

Returns an appropriate error response if the request fails.

# Payment

PayFlow provides **9 payment endpoints**:

- Get All Payments
- Get Payment Details
- Create Payment
- Update Payment
- Delete Payment
- Search Payments
- Filter Payments
- Export Payments
- Pagination

**The following section shows one representative endpoint. The remaining endpoints follow a similar documentation flow.**

## Endpoint

### Create Payment

**POST** `/payments`

Creates a new payment transaction.

### Request

| Field | Type | Description |
|---|---|---|
| recipient | string | Name of the payment recipient |
| amount | number | Payment amount |
| currency | string | Payment currency |
| paymentMethod | string | Selected payment method |

### Response

| Field | Type | Description |
|---|---|---|
| message | string | Confirmation message for successful payment creation |

**Error Response**

Returns an appropriate error response for invalid payment details.

# Profile & Password

PayFlow provides **3 profile and password endpoints**:

- Get Profile
- Update Profile
- Change Password

**The following section shows one representative endpoint. The remaining endpoints follow a similar documentation flow.**

## Endpoint

### Update Profile

**PUT** `/profile`

Updates user profile details.

### Request

| Field | Type | Description |
|---|---|---|
| name | string | User's name |
| phone | string | User's phone number |

### Response

| Field | Type | Description |
|---|---|---|
| message | string | Confirmation message for successful profile update |

**Error Response**

Returns an appropriate error response if the profile update fails.

# Support & FAQ

PayFlow provides **4 support and FAQ endpoints**:

- Create Support Ticket
- Get Support Tickets
- Get Support Ticket Details
- Get FAQs

**The following section shows one representative endpoint. The remaining endpoints follow a similar documentation flow.**

## Endpoint

### Create Support Ticket

**POST** `/support/tickets`

Creates a new support request.

### Request

| Field | Type | Description |
|---|---|---|
| subject | string | Subject of the support request |
| category | string | Category of the request |
| description | string | Description of the issue |

### Response

| Field | Type | Description |
|---|---|---|
| message | string | Confirmation message for successful ticket creation |

**Error Response**

Returns an appropriate error response if the support ticket cannot be created.

# Status Codes

**200** → Request completed successfully

**201** → Resource created successfully

**204** → Deleted / No Content

**400** → Bad Request

**401** → Unauthorized

**403** → Forbidden

**404** → Not Found




