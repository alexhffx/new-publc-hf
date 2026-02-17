---
title: "FX international payments tracking guide"
slug: "fx-international-payments-tracking-guide"
description: "Sometimes an occasional payment takes longer than usual and depending on your chosen provider and mode of payment it may be possible to track its progress."
date: "2022-09-09"
updated: "2022-10-13"
author: "Alex Axentiev"
category: "payments-ops"
featuredImage: "https://blog.hedgeflows.com/hubfs/international-payments-guide.jpg"
---

_Although international transfers have become a lot faster and cheaper over the last decade, now and then an occasional payment takes longer than usual and depending on your chosen provider and mode of payment it may be possible and useful to track the progress. This short article explains how._

### Three types of fx international payments

There are three popular ways to transfer money internationally that are available to and used by businesses active in international trade: [SWIFT payments](/glossary/swift-transfer), closed-loop networks (Western Union, Visa) and numerous fintechs offering payments via local accounts.

Closed-loop and local account schemes offer tracking within their schemes, such as Western Union’s tracking using MTCN. 

With local account payments, it is usually not possible to track payments once the money has left the account - the last step happens via local payment schemes, most of which currently don’t support tracking.

### Tracking SWIFT payments

A vast majority of Fx international payments for businesses still happen via the SWIFT network - where money travels via a chain of correspondent banks who hold accounts with each other. SWIFT connects more than ten thousand financial institutions and is often the surest way for someone to transfer funds to a recipient in a different country.  

Because two or more banks are often involved in any international transfer, the SWIFT network serves as a secure communication channel for banks to instruct and track the progress of all transfers that are being instructed and processed.  For decades banks or large corporates could query the process of a given transfer by connecting to the SWIFT network, but such an option was not available to most businesses unless they felt that transfer was lost and requested an investigation.

### Tracking payments with MT103

One of the traditional methods to track payments is SWIFT confirmations in form of MT103 messages.  MT103 is an electronic message that is often used as proof of payment as it includes all necessary details - sender and recipient details, currency and amount of a relevant international payment.  It is also great for tracing the

payments as it contains a unique end-to-end transaction reference (UETR) in field 121 of MT103.  Each SWIFT transfer sent via HedgeFlows has MT103 details readily available in the relevant details section for each transfer.  If the recipient provides UETR to their bank or financial institution, they should be able to track the payment and confirm it's status even before funds arrive.

### Tracking payments with SWIFT GPI

In 2017 SWIFT piloted Global Payments Innovation (now known as SWIFT GPI) which improves the experience for financial institutions and their customers.  Any institution that is connected to SWIFT GPI can provide more transparency about status as well as any costs deducted by intermediate banks that process the payment.

If you are worried about the status of your SWIFT transfer or want to find out more charges taken from the funds send, you can ask your provider for a SWIFT tracker that should contain these details.  Reach out to [support@hedgeflows.com](/blog/index) if you are interested in SWIFT GPI support for your [international payments](/fx-and-international-payments-for-small-businesses) with Hedgeflows.
