# Troubleshooting Guide

## Overview

This guide provides solutions to common issues that users may encounter while using the PayFlow application. Follow the recommended solutions below before contacting support.

## Table of Contents

- [Overview](#overview)
- [Application Issues](#application-issues)
- [Authentication Issues](#authentication-issues)
- [Payment Issues](#payment-issues)
- [Profile & Password Issues](#profile--password-issues)
- [Support Issues](#support-issues)
- [FAQ](#faq)

# Application Issues

## Issue

**Problem:** Application does not start.

**Cause:** Project dependencies have not been installed.

**Solution:**

Run:

```bash
npm install
```
Then start the application:

```
npm start
```
# Authentication Issues

## Issue

**Problem:** Unable to log in.

**Cause:** Incorrect credentials or the account does not exist.

**Solution:**

- Verify the email address.
- Verify the password.
- Create a new account if required.

# Payment Issues

## Issue

**Problem:** Unable to create a payment.

**Cause:** Required payment information has not been entered correctly.

**Solution:**

- Complete all required fields.
- Verify the payment amount.
- Select a valid payment method.
- Correct any validation errors before submitting.

# Profile & Password Issues

## Issue

**Problem:** Profile changes are not saved.

**Cause:** One or more fields contain invalid information.

**Solution:**

Verify the entered information and click **Update Profile** again.

---

## Issue

**Problem:** Password cannot be updated.

**Cause:** The current password may be incorrect, passwords may not match, or required fields may be empty.

**Solution:**

- Enter the correct current password.
- Ensure both password fields match.
- Complete all required fields.

# Support Issues

## Issue

**Problem:** Unable to submit a support ticket.

**Cause:** Required information has not been provided.

**Solution:**

Complete the required fields:

- Subject
- Description

Then submit the support request again.

# FAQ

## Q

**How do I create a payment?**

### A

Go to **New Payment**, enter the required payment details, and submit the payment.

## Q

**Why can't I log in?**

### A

Verify your email address and password. If you do not have an account, create a new account using **Sign Up**.

## Q

**Why is my payment not showing in the history?**

### A

Verify that the payment was created successfully and refresh the payment history.

## Q

**How do I update my profile?**

### A

Go to **Profile**, update the required information, and select **Update Profile**.

## Q

**How do I contact support?**

### A

Open **Contact Support**, provide the required information, and submit a support ticket.
