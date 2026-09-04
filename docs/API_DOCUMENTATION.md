# PayFlow API Documentation

## Overview

PayFlow API documentation describes the interfaces used for authentication, dashboard analytics, payment management, profile settings, customer support, and FAQs.

# Authentication

## Login

**POST** `/auth/login`

Authenticates an existing user.

### Request

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Response

```json
{
  "id": "USR-1001",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Register

**POST** `/auth/register`

Creates a new user account.

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Response

```json
{
  "message": "Account created successfully."
}
```

## Logout

**POST** `/auth/logout`

Logs out the current user.

### Response

```json
{
  "message": "Logout successful."
}
```

# Dashboard

## Get Dashboard Statistics

**GET** `/dashboard/stats`

Returns payment statistics displayed on the dashboard.

### Response

```json
{
  "totalPayments": 124,
  "completedPayments": 102,
  "pendingPayments": 18,
  "failedPayments": 4,
  "totalRevenue": 458900
}
```

## Get Monthly Payment Data

**GET** `/dashboard/monthly-payments`

Returns monthly payment analytics.

### Response

```json
[
  {
    "month": "January",
    "payments": 25
  },
  {
    "month": "February",
    "payments": 30
  }
]
```

## Get Recent Payments

**GET** `/dashboard/recent-payments`

Returns recent payment transactions.

### Response

```json
[
  {
    "paymentId": "PAY-1001",
    "recipient": "ABC Pvt Ltd",
    "amount": 2500,
    "currency": "INR",
    "paymentMethod": "UPI",
    "status": "Completed",
    "date": "2026-07-20"
  }
]
```

## Get Notifications

**GET** `/dashboard/notifications`

Returns user notifications.

### Response

```json
[
  {
    "id": 1,
    "title": "Payment Successful",
    "message": "Payment PAY-1001 completed successfully."
  }
]
```
# Payment API

The Payment API allows users to create, view, update, search, filter, and export payment records.

## Get All Payments

**GET** `/payments`

Returns all available payment records.

### Response

```json
[
  {
    "paymentId": "PAY-1001",
    "recipient": "ABC Pvt Ltd",
    "amount": 2500,
    "currency": "INR",
    "paymentMethod": "UPI",
    "status": "Completed",
    "date": "2026-07-20"
  }
]
```

## Get Payment Details

**GET** `/payments/{paymentId}`

Returns details of a specific payment.

### Response

```json
{
  "paymentId": "PAY-1001",
  "recipient": "ABC Pvt Ltd",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI",
  "status": "Completed",
  "date": "2026-07-20"
}
```

## Create Payment

**POST** `/payments`

Creates a new payment transaction.

### Request

```json
{
  "recipient": "ABC Pvt Ltd",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI"
}
```

### Response

```json
{
  "message": "Payment created successfully."
}
```

## Update Payment

**PUT** `/payments/{paymentId}`

Updates existing payment information.

### Request

```json
{
  "amount": 3000,
  "status": "Completed"
}
```

### Response

```json
{
  "message": "Payment updated successfully."
}
```

## Delete Payment

**DELETE** `/payments/{paymentId}`

Deletes a payment record.

### Response

```json
{
  "message": "Payment deleted successfully."
}
```

## Search Payments

**GET** `/payments?search={value}`

Searches payments using payment ID or recipient name.

### Example

```text
/payments?search=ABC
```

## Filter Payments

**GET** `/payments?status={status}`

Filters payments based on payment status.

### Supported Status

```text
Completed
Pending
Failed
```

## Export Payments

**GET** `/payments/export`

Exports payment history into CSV format.

### Response

```text
payments.csv
```

## Pagination

**GET** `/payments?page={page}&limit={limit}`

Returns payments in paginated format.

### Example

```text
/payments?page=1&limit=10
```

### Response

```json
{
  "page": 1,
  "limit": 10,
  "totalRecords": 124,
  "data": []
}
```
# Profile API

## Get Profile

**GET** `/profile`

Returns the current user's profile information.

### Response

```json
{
  "id": "USR-1001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210"
}
```

## Update Profile

**PUT** `/profile`

Updates user profile details.

### Request

```json
{
  "name": "John Doe",
  "phone": "+91 9876543210"
}
```

### Response

```json
{
  "message": "Profile updated successfully."
}
```

## Change Password

**PUT** `/profile/password`

Updates the user's account password.

### Request

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

### Response

```json
{
  "message": "Password changed successfully."
}
```

# Support API

## Create Support Ticket

**POST** `/support/tickets`

Creates a new support request.

### Request

```json
{
  "subject": "Payment Failed",
  "category": "Payment",
  "description": "Unable to complete payment."
}
```

### Response

```json
{
  "message": "Support ticket created successfully."
}
```

## Get Support Tickets

**GET** `/support/tickets`

Returns all support tickets created by the user.

### Response

```json
[
  {
    "ticketId": "TKT-1001",
    "subject": "Payment Failed",
    "category": "Payment",
    "status": "Open",
    "createdAt": "2026-07-20"
  }
]
```

## Get Support Ticket Details

**GET** `/support/tickets/{ticketId}`

Returns details of a specific support ticket.

### Response

```json
{
  "ticketId": "TKT-1001",
  "subject": "Payment Failed",
  "category": "Payment",
  "description": "Unable to complete payment.",
  "status": "Open",
  "createdAt": "2026-07-20"
}
```

# FAQ API

## Get FAQs

**GET** `/faq`

Returns frequently asked questions available in the application.

### Response

```json
[
  {
    "id": 1,
    "question": "How do I create a payment?",
    "answer": "Navigate to New Payment and complete the required details."
  }
]
```

# Status Codes

| Code | Description |
|------|-------------|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Invalid request |
| 401 | Unauthorized access |
| 404 | Resource not found |
