# Payment Gateway

# API Documentation

**Version:** 1.0

**Last Updated:** June 2026

## Table of Contents

- [Version Information](#version-information)
- [API Versioning](#api-versioning)
- [Deprecation Policy](#deprecation-policy)
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Headers](#headers)
- [Idempotency](#idempotency)
- [Create Payment](#create-payment)
- [Get Payment Status](#get-payment-status)
- [Get Payment Details](#get-payment-details)
- [List Payments](#list-payments)
- [List Transactions](#list-transactions)
- [Webhook Events](#webhook-events)
- [Request & Response Examples](#request--response-examples)
- [HTTP Status Codes](#http-status-codes)
- [Error Codes](#error-codes)
- [Error Handling](#error-handling)
- [Pagination](#pagination)
- [Rate Limiting](#rate-limiting)
- [Troubleshooting](#troubleshooting)

## Version Information

| Item | Value |
|------|-------|
| API Name | Payment Gateway API |
| Version | v1 |
| Status | Active |
| Last Updated | June 2026 |
| Content Type | application/json |

## API Versioning

The Payment Gateway API follows URI-based versioning.

Example:

```text
/api/v1/payments
```

Future API versions will be released without affecting existing integrations whenever possible.

## Deprecation Policy

Deprecated endpoints remain available for a limited period before removal.

Users are encouraged to migrate to the latest API version to receive new features, improvements, and security updates.

## Overview

The Payment Gateway API provides endpoints for creating payments, retrieving payment information, monitoring transaction status, and receiving webhook notifications.

The API follows REST principles and exchanges data using JSON.

## Base URL

### Production

```text
https://api.paymentgateway.com/v1
```

### Development

```text
http://localhost:3000/api/v1
```

## Authentication

All protected endpoints require authentication.

Example:

```http
Authorization: Bearer <access_token>
```

Requests without a valid Bearer Token receive:

```http
401 Unauthorized
```

## Headers

Common request headers:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <access_token>
```

## Idempotency

To prevent duplicate payment creation, clients should include an Idempotency-Key header.

Example:

```http
Idempotency-Key: 7f3d82a9-45fa-4bb7-a112-4f9f9d9b1abc
```

Duplicate requests with the same key return the original response instead of creating another payment.

## Create Payment

Creates a new payment.

### Endpoint

```http
POST /payments
```

### Request Body

```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI",
  "orderId": "ORD1001",
  "description": "Course Purchase"
}
```

### Success Response

```json
{
  "paymentId": "PAY100245",
  "status": "Success",
  "message": "Payment created successfully."
}
```

## Get Payment Status

Returns the current payment status.

### Endpoint

```http
GET /payments/{paymentId}/status
```
### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| paymentId | String | Unique payment identifier |

### Success Response

```json
{
  "paymentId": "PAY100245",
  "status": "Success"
}
```

## Get Payment Details

Returns complete payment information.

### Endpoint

```http
GET /payments/{paymentId}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| paymentId | String | Unique payment identifier |

### Success Response

```json
{
  "paymentId": "PAY100245",
  "customerName": "John Doe",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI",
  "status": "Success",
  "orderId": "ORD1001"
}
```

## List Payments

Returns all payments.

### Endpoint

```http
GET /payments
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Records per page |
| search | Search payments |
| status | Success, Pending, Failed |

### Success Response

```json
[
  {
    "paymentId": "PAY100245",
    "customerName": "John Doe",
    "amount": 2500,
    "status": "Success"
  }
]
```

## List Transactions

Returns transaction history.

### Endpoint

```http
GET /transactions
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Records per page |

### Success Response

```json
[
  {
    "transactionId": "TXN100245",
    "paymentId": "PAY100245",
    "amount": 2500,
    "status": "Success"
  }
]
```

## Webhook Events

Webhook notifications inform connected applications when payment events occur.

### Sample Event

```json
{
  "event": "payment.success",
  "paymentId": "PAY100245",
  "status": "Success",
  "timestamp": "2026-06-15T10:30:00Z"
}
```

Supported webhook events:

- payment.success
- payment.failed
- payment.pending

## Request & Response Examples

### Successful Request

```http
POST /payments
```

```json
{
  "customerName": "John Doe",
  "amount": 2500
}
```

### Successful Response

```json
{
  "paymentId": "PAY100245",
  "status": "Success"
}
```

### Error Response

```json
{
 "error": "Validation Failed",
  "code": "PG004",
  "message": "Customer Name is required."
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Error Codes

| Error Code | Description |
|------------|-------------|
| PG001 | Invalid request payload |
| PG002 | Authentication failed |
| PG003 | Payment not found |
| PG004 | Validation failed |
| PG005 | Duplicate payment request |
| PG006 | Internal server error |

---

## Error Handling

The API returns standard HTTP status codes together with descriptive JSON error messages.

Example:

```json
{
  "error": "Validation Failed",
  "code": "PG004",
  "message": "Amount is required."
}
```

## Pagination

Collection endpoints support pagination.

Example:

```http
GET /payments?page=1&limit=10
```

Example Response:

```json
{
  "page": 1,
  "limit": 10,
  "totalRecords": 56,
  "totalPages": 6
}
```

## Rate Limiting

To ensure service availability, API requests are rate limited.

Current limit:

- 100 requests per minute per API key.

Requests exceeding the limit receive:

```http
429 Too Many Requests
```

## Troubleshooting

| Issue | Possible Solution |
|--------|-------------------|
| Unauthorized request | Verify the Authorization header. |
| Validation failed | Ensure all required fields are provided. |
| Payment not found | Verify the Payment ID. |
| Duplicate payment | Use a unique Idempotency-Key. |
| Too many requests | Wait before sending additional requests. |
| Internal server error | Retry the request or contact support if the issue persists. |
