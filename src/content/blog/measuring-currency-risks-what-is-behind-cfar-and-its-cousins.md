---
title: "Measuring currency risks - what is behind CFaR and its cousins"
slug: "measuring-currency-risks-what-is-behind-cfar-and-its-cousins"
description: "To determine whether managing currency risk is worthwhile, it’s essential to understand exactly what you’re protecting against."
date: "2025-03-10"
author: "Alex Axentiev"
category: "fx-risk-hedging"
featuredImage: "https://blog.hedgeflows.com/hubfs/Move%20in%20GBP%20vs%20US%20Dollar%20FX%20rate%20over%2090%20days.png"
---

Quantifying FX risk is one of the most challenging aspects of foreign exchange risk management. To determine whether managing currency risk is worthwhile, it’s essential to understand exactly what you’re protecting against. This knowledge is key to making informed decisions.

While large multinational corporations often rely on concepts like Value at Risk (VaR), Cash Flow at Risk (CFaR), or Earnings at Risk (EaR) through their dedicated treasury or risk departments, these tools are less familiar and uncommon for smaller businesses with leaner finance teams. This article dives into the theory behind risk metrics and explains how to use them.

### Making sense of randomness

Measuring FX risks is based on the notion that exchange rates move randomly over time and the changes in the value of currencies over a specific period of time have different likelihoods.  This likelihood is distributed in a manner close to a normal distribution.

For example, the graph below shows the historical distribution of 90-day moves of the Pound Sterling vs the US Dollar (grey) and its modelled distribution, which is normally distributed. 

As one can see, most potential outcomes are small moves clustered around zero, but in rare outcomes, the exchange rate moved more than 20% over 90 days. 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXev38he8Wq2ed7xoCq8YJOMUTVHNb9FuMH7kO_FtUs15ZTU7aPzRol2XLgxD-tMMWYg0nS0810N6Uttv2w8cTdIQL4GTsWr9h0S0HUyM24gB4xSJaghiGrIoNY3xCMGdDnkO8w-UQ?key=by54Hl4avT4irWkvI7nXQFIp)

### Asking the right question

So, what is the right measure to use in order to quantify FX risks in a small business? It depends on what you want and what you're trying to answer.

In FX risk management, there is a big difference between asking the question, “What is the maximum I could lose due to foreign exchange?” and “What could I potentially lose on foreign exchange?”

The former question emphasises the risks posed by rare but often catastrophic events - situations that occur infrequently yet have significant consequences when they do. These are the kinds of events that make headlines and can push businesses to the brink of collapse. Take, for instance, the aftermath of the Brexit vote, which triggered a sharp decline in the value of the Pound Sterling, or the more recent crisis during Liz Truss’ government, which temporarily plunged the Pound to multi-decade lows. 

Such events are notoriously hard to predict and, as a result, are not typically reflected in prevailing exchange rates. When they do occur, however, they can cause sudden and extreme market volatility, leading to lasting financial damage. Tools like Value-at-Risk, Cashflows-at-Risk, or Earnings-at-Risk are specifically designed to measure and account for these risks.

However, because these moves are so rare, many businesses often ignore them until they have a real impact and become a topic of purposeful discussion. 

Hence, while knowing the maximum potential loss is essential, many CFOs are often more interested in more likely potential outcomes that can still have an impact on their business. 

The stability of cash flows or profit margins is often an implicit or explicit hedging objective, and even a 5% FX move can often have a sizeable impact on one’s cashflows. Because moves of such magnitude are a lot more likely to happen, it is not surprising that the jump in likelihood often makes such potential moves a lot more “real” to CFOs and their teams, and this is easier to relate to and thus manage.

For example, as shown on the graph below, the likelihood of an FX move of 4% or greater is 20 times higher (probability of 20%) than that of 14.5% (probability of 1%).  

![Likelihood and loss size for GBP vs USD FX rate move in 90 days](/blog/hs-fs/hubfs/Likelihood%20and%20loss%20size%20for%20GBP%20vs%20USD%20FX%20rate%20move%20in%2090%20days.png?width=730&height=451&name=Likelihood%20and%20loss%20size%20for%20GBP%20vs%20USD%20FX%20rate%20move%20in%2090%20days.png)

### Different risks but the same solution

Select the risk metric that best aligns with your business objectives and feels most intuitive to your needs. Fortunately, for most companies, this decision won’t affect the overall solution. FX forwards continue to be the preferred hedging instrument.

You may have noticed that we refer to more minor, more probable outcomes as a move of “X% or greater.” This phrasing reflects that these outcomes represent not a specific point but a range of possibilities (losses) that extend beyond that threshold.  If you choose to mitigate these risks, you will also reduce risks of larger, less probable outcomes.  If, for example, you decide to hedge 50% of your exposure with FX forwards, the potential losses will halve, no matter which risk metric you choose.

To find out more about how HedgeFlows can help measure and manage your currency risks, please [book a demo](/book-a-demo) or contact our sales team at hello@hedgeflows.com
