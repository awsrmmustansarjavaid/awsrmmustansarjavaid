---
title: Terraform Remote State
type: journal
date: 2026-09-20
description: Set up an S3 + DynamoDB remote backend for Terraform state locking.
technologies:
  - Terraform
  - AWS
---

# Terraform Remote State

Migrated a local Terraform state file to a remote S3 backend with
DynamoDB-based state locking, so multiple runs don't clobber each other.
