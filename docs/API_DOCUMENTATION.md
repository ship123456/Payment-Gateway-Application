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




